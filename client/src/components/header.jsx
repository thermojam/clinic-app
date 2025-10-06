import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

export const Header = () => {
    const dispatch = useDispatch();
    const { email, token } = useSelector((state) => state.user);
    const location = useLocation();

    const tabs = [
        { path: "/appointment", label: "Новая заявка" },
        { path: "/appointments", label: "Все заявки" },
    ];

    return (
        <header className="bg-white shadow">
            <div className="max-w-4xl mx-auto flex items-center justify-between h-16">
                <h1 className="text-xl font-bold">Clinic App</h1>

                {token && (
                    <div className="flex items-center gap-4">
                        <nav className="flex border-b border-gray-300">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.path}
                                    to={tab.path}
                                    className={`px-4 py-2 -mb-px font-medium border-b-2 ${
                                        location.pathname === tab.path
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-600 hover:text-blue-500"
                                    }`}
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </nav>
                        <span className="ml-4">{email}</span>
                        <button
                            onClick={() => dispatch(logoutUser())}
                            className="flex items-center gap-1 text-gray-700 px-3 py-1 rounded hover:bg-blue-300 cursor-pointer"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
