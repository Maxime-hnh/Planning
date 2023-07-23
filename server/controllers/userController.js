const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

// SIGN UP
exports.signUp = async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body)
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(200).json(user);

    } catch (err) {
        res.status(500).send('Une erreur est survenue : ' + err); 
    }
};


exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] }
        });
        res.send(user);
    } catch (err) {
        res.status(500).send('Une erreur est survenue : ' + err); 
    }
};