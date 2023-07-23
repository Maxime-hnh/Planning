const {Sequelize, DataTypes} = require('sequelize');
const db = require('../util/database');

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



module.exports = Customer

const Contract = require('./contract')
Customer.associate = (models) => {

    Customer.hasOne(models.Contract, {
        foreignKey: 'customer_id',
        required : false
    });
}