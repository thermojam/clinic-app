export const getAppointments = () => {
    const token = sessionStorage.getItem("token");
    return fetch("http://localhost:8888/appointments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then(async (res) => {
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Forbidden");
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
