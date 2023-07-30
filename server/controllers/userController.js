const { User, validate, sequelize } = require('../models/user');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');


// SIGN UP
exports.signUp = async (req, res) => {
    const { body } = req
    const t = await sequelize.transaction()
    try {
        const { error } = validate(body)
        if (error) {
            t.rollback()
            return res.status(400).send(error.details[0].message)
        };
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        body.password = await bcrypt.hash(body.password, salt);
        const user = await User.create(body, { fields: ['firstName', 'lastName', 'email', 'password'], transaction: t });
        await t.commit();
        res.status(httpStatus.OK).json(user);
    } catch (err) {
        t.rollback();
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Une erreur est survenue : ' + err);
    }
};

// GET ME
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            res.status(httpStatus.NOT_FOUND).send()
        }
        res.status(httpStatus.OK).json(user);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Une erreur est survenue : ' + err);
    }
};