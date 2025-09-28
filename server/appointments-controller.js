const Appointment = require('./models/Appointment');

const getAppointments = async () => {
    const appointments = await Appointment.find();
    return appointments;
};

const addAppointment = async (appointment) => {
    const createdAppointment = await Appointment.create(appointment);

    return createdAppointment;
};

module.exports = {getAppointments, addAppointment};
