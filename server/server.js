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

// auth endpoints
app.post("/auth", async (req, res) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// (dev) create user once via POST /auth/register (can be removed in prod)
app.post("/auth/register", async (req, res) => {
    try {
        const user = await createUser(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// public: add appointment
app.post("/appointment", async (req, res) => {
    try {
        const appointment = await addAppointment(req.body);
        res.json(appointment);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// protected routes
app.post("/appointments", auth, async (req, res) => {
    try {
        const list = await getAppointments();
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// connect
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(port, () => console.log(`Server started on ${port}`));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        // Start server anyway to allow front-end to run in dev and show errors
        app.listen(port, () =>
            console.log(`Server started on ${port} (no DB)`)
        );
    });
