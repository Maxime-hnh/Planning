const { Sequelize, DataTypes } = require('sequelize');
const db = require('../util/database');
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false
    }
}, {
    timestamps: false
});


// GENERATE AND SAVE KEY 
User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id, role: this.role }, process.env.JWTPRIVATEKEY)
    return token;
};


const validate = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        email: Joi.string().email().max(40).required(),
        password: Joi.string().required(),
        role: Joi.string()
    });
    return schema.validate(user);
};

module.exports = { User, validate };