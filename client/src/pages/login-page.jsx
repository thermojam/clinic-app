import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, error, loading } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Введите email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Некорректный email";

        if (!password.trim()) newErrors.password = "Введите пароль";
        else if (password.length < 6)
            newErrors.password = "Минимум 6 символов";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(loginUser(email, password));
    };

    useEffect(() => {
        if (token) navigate("/appointments");
    }, [token, navigate]);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Вход для сотрудников</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`p-2 rounded text-white ${
                        loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    }`}
                >
                    {loading ? "Вход..." : "Войти"}
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
