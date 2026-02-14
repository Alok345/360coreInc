const { User, sequelize } = require('./src/models');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function seed() {
    try {
        await sequelize.sync();

        // Check if seed user already exists
        const existing = await User.findOne({ where: { email: 'admin@example.com' } });
        if (existing) {
            console.log('Seed user already exists with referral code:', existing.referralCode);
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const admin = await User.create({
            name: 'System Origin',
            email: 'admin@example.com',
            password: hashedPassword,
            referralCode: 'ORIGIN',
            totalInvested: 0,
            totalEarned: 0
        });

        console.log('Seed user created successfully!');
        console.log('--- CREDENTIALS ---');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        console.log('Referral Code:', admin.referralCode);
        console.log('-------------------');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
