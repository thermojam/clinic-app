const mongoose = require('mongoose');
const validator = require('validator');

const AppointmentSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
