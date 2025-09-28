const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./constants');

const loginUser = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('User is not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Wrong password');
    }

    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '30d'});

    return {email: user.email, token};
};

module.exports = {loginUser};
