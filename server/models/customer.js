const {Sequelize, DataTypes} = require('sequelize');
const db = require('../util/database');
const Contract = require('./contract')

const Customer = db.define('customer', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    firstName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    lastName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phoneNumber : {
        type : Sequelize.STRING,
        allowNull : true
    },
    mail : {
        type : Sequelize.STRING,
        allowNull : true
    },
    knownFrom : {
        type : Sequelize.STRING,
        allowNull : true
    },
    hasApproved : {
        type : Sequelize.BOOLEAN,
        allowNull : true
    }
});

Customer.associate = () => {

    Customer.hasMany(Contract, {
        foreignKey: 'customer_id',
        as : 'Contracts',
        required : false
    });
}

module.exports = Customer