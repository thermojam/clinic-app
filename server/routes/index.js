const express = require("express");
const auth = require("../middlewares/auth");  // Путь относительно routes/
const {
    loginUser,
    createUser,
} = require("../controllers/users-controller");
const {
    addAppointment,
    getAppointments,
} = require("../controllers/appointments-controller");

const router = express.Router();

router.post("/auth", async (req, res) => {
    try {
        const user = await loginUser(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

router.post("/auth/register", async (req, res) => {
    try {
        const user = await createUser(req.body.email, req.body.password);
        res.json(user);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

router.post("/appointment", async (req, res) => {
    try {
        const appointment = await addAppointment(req.body);
        res.json(appointment);
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

router.post("/appointments", auth, async (req, res) => {
    try {
        const list = await getAppointments();
        res.json(list);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = router;
