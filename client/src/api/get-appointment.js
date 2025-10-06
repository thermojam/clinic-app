export const getAppointments = () => {
    return fetch("http://localhost:8888/appointments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    })
        .then(async (res) => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Ошибка загрузки списка");
            }
            return res.json();
        })
        .then((data) =>
            data.map((appointment) => ({
                date: appointment.date,
                fullName: appointment.full_name,
                phone: appointment.phone,
                problem: appointment.problem,
            }))
        );
};
