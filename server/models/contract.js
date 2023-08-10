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
    deposit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    waitingDeposit: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    depositReceived: { // 1 IL a reçu L ACOMPTE, colorier en rouge, tableau dispo
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    invoiceDepositSent: { //2  une fois quil a l'acompte il doit envoyer la facture, une fois que la facture est envoyée il fait un croix sur son tableau
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deadlineTotal: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    reminderTotal: { // 3 mail relance solde 
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    invoiceTotalSent: { //4 quand solde reçu, il doit envoyer facture, quand facture envoyée => tableau colonne vert
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

