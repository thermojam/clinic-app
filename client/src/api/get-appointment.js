export const getAppointments = () => {
    const token = sessionStorage.getItem("token");

    return fetch("http://localhost:8888/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ token }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.name === "JsonWebTokenError") {
                return [];
            }

            return data.map((appointment) => ({
                date: appointment.date,
                fullName: appointment.full_name,
                phone: appointment.phone,
                problem: appointment.problem,
            }));
        });
};
