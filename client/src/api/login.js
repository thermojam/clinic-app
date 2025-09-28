export const login = (email, password) =>
    fetch('http://localhost:8888/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
