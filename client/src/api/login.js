export const login = (email, password) =>
    fetch("http://localhost:8888/auth", {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify({email, password}),
    }).then(async (res) => {
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Login failed");
        }
        return res.json();
    });
