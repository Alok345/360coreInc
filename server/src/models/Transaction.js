const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('DEPOSIT', 'DAILY_RETURN', 'REFERRAL_BONUS'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true, // e.g., "From User B's deposit"
    },
    date: {
        type: DataTypes.DATE, // To track daily returns? Or createAt is enough
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Transaction;
