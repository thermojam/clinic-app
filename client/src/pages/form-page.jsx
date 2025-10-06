import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAppointment } from "../actions";
import { IMaskInput } from "react-imask";

export const FormPage = () => {
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [problem, setProblem] = useState("");
    const [date, setDate] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) newErrors.fullName = "Введите ФИО";
        else if (fullName.trim().length < 3) newErrors.fullName = "Минимум 3 символа";
        else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(fullName)) newErrors.fullName = "Только буквы и пробелы";

        if (!phone) newErrors.phone = "Введите номер телефона";
        else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) newErrors.phone = "Неверный формат телефона";

        if (problem && problem.length > 50) newErrors.problem = "Максимум 50 символов";

        if (!date) newErrors.date = "Выберите дату";
        else {
            const selected = new Date(date);
            if (selected < new Date()) newErrors.date = "Дата не может быть в прошлом";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setSuccess(false);

        try {
            await dispatch(createAppointment({ full_name: fullName, phone, problem, date }));
            setFullName("");
            setPhone("");
            setProblem("");
            setDate("");
            setSuccess(true);
            setErrors({});
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Записаться на приём</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ФИО"
                        className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                    <IMaskInput
                        mask="+7 (000) 000-00-00"
                        value={phone}
                        unmask={false}
                        onAccept={(v) => setPhone(v)}
                        placeholder="Телефон"
                        className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                    <input
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="Проблема"
                        className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
                </div>

                <div>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-white/20 p-2 rounded bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`p-2 rounded text-white ${
                        loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600 cursor-pointer"
                    }`}
                >
                    {loading ? "Отправка..." : "Отправить"}
                </button>
                {success && <p className="text-green-600 text-center mt-2">Заявка успешно отправлена!</p>}
            </form>
        </div>
    );
};
