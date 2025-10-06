const express = require("express");
const auth = require("../middlewares/auth");  // Путь относительно routes/
const { body, validationResult } = require("express-validator");

const {
    loginUser,
    createUser,
} = require("../controllers/users-controller");
const {
    addAppointment,
    getAppointments,
} = require("../controllers/appointments-controller");

const router = express.Router();

router.post("/auth",
    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Введите корректный email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Пароль должен содержать минимум 6 символов"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const result = await loginUser(email, password);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

router.post(
    "/auth/register",
    [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Введите корректный email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Пароль должен содержать минимум 6 символов"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const result = await createUser(email, password);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

// Получить список
router.get("/appointments", async (req, res) => {
    try {
        const list = await getAppointments();
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Добавить запись с валидацией
router.post(
    "/appointment",
    [
        body("full_name")
            .trim()
            .isLength({ min: 3 }).withMessage("ФИО должно содержать не менее 3 символов")
            .matches(/^[A-Za-zА-Яа-яЁё\s]+$/).withMessage("ФИО должно содержать только буквы и пробелы"),
        body("phone")
            .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/).withMessage("Телефон должен быть в формате +7 (999) 999-99-99"),
        body("problem")
            .optional({ checkFalsy: true })
            .isLength({ max: 200 }).withMessage("Описание проблемы не должно превышать 200 символов"),
        body("date")
            .custom(value => {
                const selected = new Date(value);
                if (isNaN(selected.getTime())) throw new Error("Некорректная дата");
                if (selected < new Date()) throw new Error("Дата не может быть в прошлом");
                return true;
            }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const appointment = await addAppointment(req.body);
            res.json(appointment);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
);

router.post("/appointments", auth, async (req, res) => {
    try {
        const list = await getAppointments();
        res.json(list);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

module.exports = router;
