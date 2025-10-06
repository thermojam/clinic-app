import {Routes, Route, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {FormPage, LoginPage, AppointmentsPage} from "./pages";
import {Header} from "./components/Header";
import {PrivateRoute} from "./components/private-route";

export const App = () => {
    const {token} = useSelector((state) => state.user);

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/appointment" element={<FormPage/>}/>
                <Route
                    path="/appointments"
                    element={
                        <PrivateRoute>
                            <AppointmentsPage/>
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to={token ? "/appointments" : "/login"}/>}/>
            </Routes>
        </div>
    );
};
