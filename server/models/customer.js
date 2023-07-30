const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');


class Customer extends Model { }
Customer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mail1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstName2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mail2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    knownFrom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hasApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    opinionAsked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'customer',
    freezeTableName: true
});



module.exports = { Customer, sequelize }

