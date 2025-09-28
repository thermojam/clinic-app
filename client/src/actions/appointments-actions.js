import { addAppointment, getAppointments } from "../api";

export const createAppointment = (appointment) => async (dispatch) => {
    try {
        const data = await addAppointment(appointment);
        if (data.error) {
            dispatch({ type: "APPOINTMENT_ERROR", payload: data.error });
        } else {
            dispatch({ type: "APPOINTMENT_ADDED", payload: data });
        }
    } catch (error) {
        dispatch({ type: "APPOINTMENT_ERROR", payload: error.message });
    }
};

export const fetchAppointments = () => async (dispatch) => {
    try {
        const data = await getAppointments();
        dispatch({ type: "APPOINTMENTS_LOADED", payload: data });
    } catch (error) {
        dispatch({ type: "APPOINTMENT_ERROR", payload: error.message });
    }
};
