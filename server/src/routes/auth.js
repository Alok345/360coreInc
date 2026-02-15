const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator') || { check: () => true, validationResult: () => ({ isEmpty: () => true }) };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Transaction } = require('../models');

router.post('/register', async (req, res) => {
    let { name, email, password, referralCode } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    email = email.toLowerCase().trim();

    try {
        if (!referralCode) {
            return res.status(400).json({ msg: 'Referral code is required' });
        }

        const referrer = await User.findOne({ where: { referralCode } });
        if (!referrer) {
            return res.status(400).json({ msg: 'Invalid referral code' });
        }

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const generateReferral = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }

        let newReferralCode = generateReferral();
        while (await User.findOne({ where: { referralCode: newReferralCode } })) {
            newReferralCode = generateReferral();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            name,
            email,
            password: hashedPassword,
            referralCode: newReferralCode,
            referredBy: referralCode,
        });

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                const userData = user.toJSON();
                delete userData.password;
                res.json({
                    token,
                    user: {
                        ...userData,
                        remainingCap: (parseFloat(userData.totalInvested) * 3) - parseFloat(userData.totalEarned)
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ errors: [{ msg: 'Please enter all fields' }] });
    }

    email = email.toLowerCase().trim();

    try {
        let user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) {
                    console.error('JWT Signing Error:', err);
                    return res.status(500).send('Server error');
                }

                try {
                    const userData = user.toJSON();
                    delete userData.password;

                    const invested = parseFloat(userData.totalInvested || 0);
                    const earned = parseFloat(userData.totalEarned || 0);
                    const remainingCap = (invested * 3) - earned;

                    res.json({
                        token,
                        user: {
                            ...userData,
                            remainingCap: remainingCap > 0 ? remainingCap : 0
                        }
                    });
                } catch (jsonErr) {
                    res.status(500).send('Server error');
                }
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', require('../middleware/auth'), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        const remainingCap = (parseFloat(user.totalInvested) * 3) - parseFloat(user.totalEarned);

        res.json({
            ...user.toJSON(),
            remainingCap: remainingCap > 0 ? remainingCap : 0
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/referrals', require('../middleware/auth'), async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.user.id);
        if (!currentUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const referrals = await User.findAll({
            where: { referredBy: currentUser.referralCode },
            attributes: ['id', 'name', 'email', 'totalInvested', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        res.json(referrals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
