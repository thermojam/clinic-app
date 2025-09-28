require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {loginUser} = require("./users-controller");
const auth = require("./middlewares/auth");
const {
    addAppointment,
    getAppointments,
} = require("./appointments-controller");

const port = process.env.PORT || 8888;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Авторизация
app.post("/auth", async (req, res) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message});
    }
});

// Создание заявки
app.post("/appointment", async (req, res) => {
    try {
        const appointment = await addAppointment(req.body);
        res.send(appointment);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message});
    }
});

// Доступ к списку только авторизованным
app.use(auth);

app.post("/appointments", async (req, res) => {
    try {
        const appointments = await getAppointments();
        res.send(appointments);
    } catch (e) {
        console.log(e);
        res.status(500).send({error: e.message});
    }
});

// Подключение к базе
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(chalk.green("✅ MongoDB connected"));
        app.listen(port, () =>
            console.log(chalk.blue(`🚀 Server started on port ${port}...`))
        );
    })
    .catch((err) => {
        console.error(chalk.red("❌ MongoDB connection error:"), err);
    });
