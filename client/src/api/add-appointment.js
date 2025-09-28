export const addAppointment = (appointment) =>
    fetch("http://localhost:8888/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(appointment),
    }).then((res) => res.json());
