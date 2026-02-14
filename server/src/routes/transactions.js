const express = require('express');
const router = express.Router();
const { User, Transaction, sequelize } = require('../models');
const auth = require('../middleware/auth');
const { Op } = require('sequelize');

// @route    POST api/transactions/deposit
// @desc     Make a deposit
// @access   Private
router.post('/deposit', auth, async (req, res) => {
    const { amount } = req.body;
    const depositAmount = parseFloat(amount);

    if (isNaN(depositAmount) || depositAmount < 100) {
        return res.status(400).json({ msg: 'Minimum deposit is $100' });
    }

    const t = await sequelize.transaction();

    try {
        const user = await User.findByPk(req.user.id, { transaction: t });
        if (!user) {
            await t.rollback();
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check existing deposits BEFORE creating new one to determine bonus eligibility
        const existingDepositCount = await Transaction.count({
            where: {
                userId: user.id,
                type: 'DEPOSIT'
            },
            transaction: t
        });

        // Create DEPOSIT transaction
        await Transaction.create({
            userId: user.id,
            type: 'DEPOSIT',
            amount: depositAmount,
            description: 'Deposit',
        }, { transaction: t });

        // Update user totalInvested
        user.totalInvested = parseFloat(user.totalInvested) + depositAmount;
        await user.save({ transaction: t });

        // Check for Referral Bonus (5% on 1st and 2nd deposits of referred user)
        // If we had 0 or 1 deposit before this one, then this is 1st or 2nd.
        if (existingDepositCount < 2 && user.referredBy) {
            const referrer = await User.findOne({ where: { referralCode: user.referredBy }, transaction: t });

            if (referrer) {
                // Calculate potential bonus
                const bonusAmount = depositAmount * 0.05;

                // Check referrer's earning cap
                const referrerCap = parseFloat(referrer.totalInvested) * 3;
                const currentEarned = parseFloat(referrer.totalEarned);

                let actualBonus = bonusAmount;

                // Cap logic: if current + bonus > max, only give difference
                if (currentEarned >= referrerCap) {
                    actualBonus = 0;
                } else if (currentEarned + bonusAmount > referrerCap) {
                    actualBonus = referrerCap - currentEarned;
                }

                if (actualBonus > 0) {
                    // Credit referrer
                    await Transaction.create({
                        userId: referrer.id,
                        type: 'REFERRAL_BONUS',
                        amount: actualBonus,
                        description: `Bonus from ${user.name} deposit`,
                    }, { transaction: t });

                    referrer.totalEarned = parseFloat(referrer.totalEarned) + actualBonus;
                    await referrer.save({ transaction: t });
                }
            }
        }

        await t.commit();
        res.json({ msg: 'Deposit successful' });
    } catch (err) {
        await t.rollback();
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/transactions
// @desc     Get own transactions (last 10)
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']],
            limit: 10
        });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
