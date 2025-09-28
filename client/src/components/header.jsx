import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/user-actions";

export default function Header() {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.user);

    return (
        <header className="p-4 bg-gray-200 flex justify-between items-center">
            {/* Лого */}
            <h1 className="text-xl font-bold">
                <Link to="/">Clinic App</Link>
            </h1>

            {/* Навигация */}
            <nav className="flex items-center gap-4">
                {!email && (
                    <>
                        <Link to="/" className="hover:underline">
                            Заявка
                        </Link>
                        <Link to="/login" className="hover:underline">
                            Войти
                        </Link>
                    </>
                )}

                {email && (
                    <>
                        <Link to="/appointments" className="hover:underline">
                            Заявки
                        </Link>
                        <span className="text-gray-700">{email}</span>
                        <button
                            onClick={() => dispatch(logoutUser())}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Выйти
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}
