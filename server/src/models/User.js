const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    referralCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    referredBy: {
        type: DataTypes.STRING, // Store the referral code of the referrer
        allowNull: true,
    },
    totalInvested: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    totalEarned: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
});

module.exports = User;
