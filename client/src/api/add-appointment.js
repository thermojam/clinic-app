export const addAppointment = (appointment) =>
    fetch("http://localhost:8888/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(appointment),
    }).then(async (res) => {
        if (!res.ok) {
            const err = await res.json();
            throw new Error(
                err.error?.[0]?.msg || err.error || "Ошибка при добавлении записи"
            );
        }
        return res.json();
    });
