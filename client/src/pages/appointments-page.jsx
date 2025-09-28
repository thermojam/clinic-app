import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../actions";
import { Loader }  from "../components/loader";

export const AppointmentsPage = () => {
    const dispatch = useDispatch();
    const { appointments = [], loading, error } = useSelector(
        (state) => state.appointments
    );

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 rounded-lg shadow-lg backdrop-blur-md bg-white/30">
            <h2 className="text-xl font-bold mb-4 text-center">Все заявки</h2>

            <div className="grid grid-cols-4 gap-2 font-semibold border-b pb-2 mb-2">
                <span>Дата</span>
                <span>ФИО</span>
                <span>Телефон</span>
                <span>Проблема</span>
            </div>

            {appointments.map((a, idx) => (
                <div
                    key={idx}
                    className="grid grid-cols-4 gap-2 border-b py-2 hover:bg-white/20 transition-colors"
                >
                    <span>
                        {new Date(a.date).toLocaleString("ru-RU", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                    <span>{a.fullName}</span>
                    <span>{a.phone}</span>
                    <span>{a.problem}</span>
                </div>
            ))}
        </div>
    );
};
