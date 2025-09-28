import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.user);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};
