const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isAuthenticated = () => {
    return !!getToken();
};

const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch (err) {
        return null;
    }
};

export const getUserId = () => {
    const token = getToken();
    if (!token) return null;
    const decoded = decodeToken(token);
    return decoded?.id || null;
};

export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
    const decoded = decodeToken(token);
    return decoded?.role || null;
};
