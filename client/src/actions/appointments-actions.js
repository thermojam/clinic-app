import { addAppointment } from "../api";
import { getAppointments } from "../api";

export const createAppointment = (appointment) => async (dispatch) => {
    dispatch({ type: "ADD_APPOINTMENT_START" });
    try {
        const data = await addAppointment(appointment);
        dispatch({ type: "ADD_APPOINTMENT_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ADD_APPOINTMENT_FAIL", payload: error.message });
    }
};

export const fetchAppointments = () => async (dispatch) => {
    dispatch({ type: "FETCH_APPOINTMENTS_START" });
    try {
        const data = await getAppointments();
        dispatch({ type: "FETCH_APPOINTMENTS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "FETCH_APPOINTMENTS_FAIL", payload: error.message });
    }
};
