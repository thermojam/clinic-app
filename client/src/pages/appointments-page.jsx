import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../actions/appointments-actions";

export const AppointmentsPage = () => {
    const dispatch = useDispatch();
    const { list, error } = useSelector((state) => state.appointments);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Заявки</h2>
            {error && <p className="text-red-500">{error}</p>}
            {list.length === 0 ? (
                <p className="text-gray-600">Заявок пока нет</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ФИО</th>
                        <th className="border p-2">Телефон</th>
                        <th className="border p-2">Проблема</th>
                        <th className="border p-2">Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((a, i) => (
                        <tr key={i}>
                            <td className="border p-2">{a.fullName}</td>
                            <td className="border p-2">{a.phone}</td>
                            <td className="border p-2">{a.problem}</td>
                            <td className="border p-2">
                                {new Date(a.date).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
