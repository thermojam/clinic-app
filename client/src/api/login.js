export const login = (email, password) =>
    fetch("http://localhost:8888/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ email, password }),
    }).then(async (res) => {
        if (!res.ok) {
            const err = await res.json();
            const message =
                Array.isArray(err.error) && err.error.length > 0
                    ? err.error[0].msg
                    : err.error || "Ошибка входа";
            throw new Error(message);
        }
        return res.json();
    });
