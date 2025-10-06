const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    problem: {
        type: String
    },
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Appointment", appointmentSchema);
