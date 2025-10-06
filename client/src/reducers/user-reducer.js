const initial = {
    email: null,
    token: sessionStorage.getItem("token") || null,
    loading: false,
    error: null,
};

export const userReducer = (state = initial, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { ...state, loading: true, error: null };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                email: action.payload.email,
                token: action.payload.token,
            };
        case "LOGIN_ERROR":
            return { ...state, loading: false, error: action.payload };
        case "LOGOUT":
            return { email: null, token: null, loading: false, error: null };
        default:
            return state;
    }
};
