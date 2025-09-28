import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../actions/appointments-actions";

export const AppointmentsPage = () => {
    const dispatch = useDispatch();
    const { appointments = [], loading, error } = useSelector(
        (state) => state.appointments
    );

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Все заявки</h2>
            <table className="w-full border-collapse border">
                <thead>
                <tr>
                    <th className="border p-2">Дата</th>
                    <th className="border p-2">ФИО</th>
                    <th className="border p-2">Телефон</th>
                    <th className="border p-2">Проблема</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((a, idx) => (
                    <tr key={idx}>
                        <td className="border p-2">{a.date}</td>
                        <td className="border p-2">{a.fullName}</td>
                        <td className="border p-2">{a.phone}</td>
                        <td className="border p-2">{a.problem}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
