const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/transactions', require('./src/routes/transactions'));
app.use('/api/admin', require('./src/routes/admin'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced');

        const { User } = require('./src/models');
        const count = await User.count();
        if (count === 0) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await User.create({
                name: 'Admin User',
                email: 'admin@gmail.com',
                password: hashedPassword,
                referralCode: 'ADMIN1',
                totalInvested: 0
            });
            console.log('Seeded Admin User with referral code: ADMIN1');
        }

    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});
