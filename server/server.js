require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { loginUser, createUser } = require("./users-controller");
const auth = require("./middlewares/auth");
const {
    addAppointment,
    getAppointments,
} = require("./appointments-controller");

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/auth", async (req, res) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.post("/auth/register", async (req, res) => {
    try {
        const user = await createUser(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.post("/appointment", async (req, res) => {
    try {
        const appointment = await addAppointment(req.body);
        res.json(appointment);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.post("/appointments", auth, async (req, res) => {
    try {
        const list = await getAppointments();
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => console.log(`Server started on ${port}`));
    })
    .catch((err) => {
        app.listen(port, () =>
            console.log(`Server started on ${port} (no DB)`)
        );
    });
