const initialState = {
    appointments: [],
    loading: false,
    error: null,
};

export const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_APPOINTMENTS_START":
            return { ...state, loading: true, error: null };
        case "FETCH_APPOINTMENTS_SUCCESS":
            return { ...state, loading: false, appointments: action.payload };
        case "FETCH_APPOINTMENTS_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
