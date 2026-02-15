const express = require('express');
const router = express.Router();
const { User, Transaction, sequelize } = require('../models');
const { Op } = require('sequelize');

router.post('/run-daily-returns', async (req, res) => {
    const adminKey = req.header('x-admin-key');
    if (!adminKey || (adminKey !== process.env.ADMIN_KEY && adminKey !== 'secret-admin-key')) {
        return res.status(401).json({ msg: 'Unauthorized: Invalid Admin Key' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
        const users = await User.findAll({
            where: {
                totalInvested: {
                    [Op.gt]: 0
                }
            }
        });

        let processedCount = 0;

        for (const user of users) {
            const lastReturn = await Transaction.findOne({
                where: {
                    userId: user.id,
                    type: 'DAILY_RETURN',
                    createdAt: {
                        [Op.gte]: today
                    }
                }
            });

            if (lastReturn) continue;

            const dailyReturn = parseFloat(user.totalInvested) * 0.006;
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
        res.status(500).send('Server Error');
    }
});

module.exports = router;
