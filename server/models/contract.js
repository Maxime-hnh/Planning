const { Sequelize, DataType } = require('sequelize');
const db = require('../util/database');
const Customer = require('./customer')


const Contract = db.define('contract', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    eventType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    deposit: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    note: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Customer,
            id: 'id'
        }
    }
});

module.exports = Contract

Contract.belongsTo(Customer, { foreignKey: 'customer_id' });