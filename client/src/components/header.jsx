import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/user-actions";
import { Link } from "react-router-dom";

export default function Header() {
    const dispatch = useDispatch();
    const { email, token } = useSelector((state) => state.user);

    return (
        <header className="p-4 bg-gray-200 flex justify-between items-center">
            <h1 className="text-xl font-bold">Clinic App</h1>

            {token ? (
                <nav className="flex items-center gap-4">
                    <Link to="/appointment" className="text-blue-600 hover:underline">
                        Новая заявка
                    </Link>
                    <Link to="/appointments" className="text-blue-600 hover:underline">
                        Все заявки
                    </Link>
                    <span>{email}</span>
                    <button
                        onClick={() => dispatch(logoutUser())}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </nav>
            ) : null}
        </header>
    );
}
