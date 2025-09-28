import { login } from "../api";

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const data = await login(email, password);
        sessionStorage.setItem("token", data.token);
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAIL", payload: error.message });
    }
};

export const logoutUser = () => (dispatch) => {
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
};
