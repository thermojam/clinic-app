const initialState = {
    list: [],
    error: null,
};

export const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "APPOINTMENTS_LOADED":
            return { ...state, list: action.payload };
        case "APPOINTMENT_ADDED":
            return { ...state, list: [...state.list, action.payload] };
        case "APPOINTMENT_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
