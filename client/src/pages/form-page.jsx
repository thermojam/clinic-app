import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAppointment } from "../actions/appointments-actions";
import { IMaskInput } from "react-imask";

export const FormPage = () => {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [problem, setProblem] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            await dispatch(
                createAppointment({ full_name: fullName, phone, problem, date })
            );
            setFullName("");
            setPhone("");
            setProblem("");
            setDate("");
            setSuccess(true);
        } catch (err) {
            console.error("Ошибка при отправке:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Записаться на приём</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* ФИО */}
                <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ФИО"
                    className="border p-2 rounded"
                    required
                />

                {/* Телефон через react-imask */}
                <IMaskInput
                    mask="+7 (000) 000-00-00"
                    value={phone}
                    unmask={true} // сохраняем цифры без форматирования
                    onAccept={(value) => setPhone(value)}
                    placeholder="Телефон"
                    className="border p-2 rounded"
                    required
                />

                {/* Проблема */}
                <input
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="Проблема"
                    className="border p-2 rounded"
                />

                {/* Дата/время */}
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                {/* Кнопка */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`p-2 rounded text-white ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {loading ? "Отправка..." : "Отправить"}
                </button>

                {/* Сообщение об успехе */}
                {success && (
                    <p className="text-green-600 text-center mt-2">
                        ✅ Заявка успешно отправлена!
                    </p>
                )}
            </form>
        </div>
    );
};
