const Appointment = require("../models/Appointment");

const addAppointment = async (appointment) => {
    const created = await Appointment.create(appointment);
    return created;
};

const getAppointments = async () => {
    const list = await Appointment.find().sort({ date: -1 });
    return list;
};

module.exports = { addAppointment, getAppointments };
