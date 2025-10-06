const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../constants");

function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).send({error: "No token provided"});

    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).send({error: "Invalid token"});
    }
}

module.exports = auth;
