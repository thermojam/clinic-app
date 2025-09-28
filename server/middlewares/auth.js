const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../constants');

function auth(req, res, next) {
    const token = req.body.token;

    try {
        const verifyResult = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.send(error);
    }
}

module.exports = auth;
