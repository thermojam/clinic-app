import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../actions";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token, error} = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    useEffect(() => {
        if (token) {
            navigate("/appointments");
        }
    }, [token, navigate]);

    return (
        <div
            className="max-w-md mx-auto mt-10 p-6 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Вход для сотрудников</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
                    Войти
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
