const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');
const { Customer } = require('./customer');

class Contract extends Model { }
Contract.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    eventType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    validateDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deposit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    waitingDeposit: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    depositReceived: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    invoiceDepositSent: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deadlineBalance: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    reminderBalance: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    invoiceBalanceSent: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            id: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'contract',
    freezeTableName: true
});

module.exports = { Contract, sequelize }

