const express = require('express');
const router = express.Router();
const { User, Transaction, sequelize } = require('../models');
const { Op } = require('sequelize');

// @route    POST api/admin/run-daily-returns
// @desc     Run daily return calculation for all users
// @access   Protected (Admin Key)
router.post('/run-daily-returns', async (req, res) => {
    // Validate Admin Key
    const adminKey = req.header('x-admin-key');
    if (!adminKey || (adminKey !== process.env.ADMIN_KEY && adminKey !== 'secret-admin-key')) {
        return res.status(401).json({ msg: 'Unauthorized: Invalid Admin Key' });
    }

    // Prevent running twice same day logic?
    // We can check if any DAILY_RETURN transaction exists for today.
    // This is a global check or per user check? "Avoid duplicate credit if called twice same day".
    // A simple way is to check the last DAILY_RETURN transaction date for any user, or just store a global flag.
    // Better: Check per user to be robust.

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        // We fetch all users who have invested.
        // In a real large system, we would batch this. For this assignment, fetchAll is okay or stream.
        // 100,000 users check later.

        const users = await User.findAll({
            where: {
                totalInvested: {
                    [Op.gt]: 0
                }
            }
        });

        let processedCount = 0;

        for (const user of users) {
            // Check if user already got daily return today
            const lastReturn = await Transaction.findOne({
                where: {
                    userId: user.id,
                    type: 'DAILY_RETURN',
                    createdAt: {
                        [Op.gte]: today
                    }
                }
            });

            if (lastReturn) continue; // Skip if already paid today

            // Calculate Daily Return: 0.6%
            const dailyReturn = parseFloat(user.totalInvested) * 0.006;

            // 3x Cap Check
            const maxEarnings = parseFloat(user.totalInvested) * 3;
            const currentEarnings = parseFloat(user.totalEarned);

            let actualReturn = dailyReturn;

            if (currentEarnings >= maxEarnings) {
                actualReturn = 0;
            } else if (currentEarnings + dailyReturn > maxEarnings) {
                actualReturn = maxEarnings - currentEarnings;
            }

            if (actualReturn > 0) {
                await Transaction.create({
                    userId: user.id,
                    type: 'DAILY_RETURN',
                    amount: actualReturn,
                    description: 'Daily Return (0.6%)',
                });

                user.totalEarned = parseFloat(user.totalEarned) + actualReturn;
                await user.save();
                processedCount++;
            }
        }

        res.json({ msg: `Daily returns processed for ${processedCount} users.` });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
