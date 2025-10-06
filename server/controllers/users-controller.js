const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Пользователь не найден");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Неверный пароль");

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
    return { email: user.email, token };
};

const createUser = async (email, password) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Пользователь уже существует");

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed });

    return { email: newUser.email };
};

module.exports = { loginUser, createUser };
