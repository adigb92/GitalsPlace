const setToken = (token: string): void => {
    localStorage.setItem("token", token);
};

const getToken = (): string | null => {
    return localStorage.getItem("token");
};

const removeToken = (): void => {
    localStorage.removeItem("token");
};

const setRole = (role: string): void => {
    localStorage.setItem("role", role);
};

const getRole = (): string | null => {
    return localStorage.getItem("role");
};

const removeRole = (): void => {
    localStorage.removeItem("role");
};

const isAuthenticated = (): boolean => {
    return getToken() !== null;
};

export {
    setToken,
    getToken,
    removeToken,
    setRole,
    getRole,
    removeRole,
    isAuthenticated,
};