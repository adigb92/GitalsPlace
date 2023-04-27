import { useEffect, useState } from "react";
import { getRole, getToken } from "../utils/auth";

export const useAuthStatus = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateAuthStatus = () => {
        const token = getToken();
        const role = getRole();
        setIsLoggedIn(!!token);
        setIsAdmin(role === "admin");
    };

    useEffect(() => {
        updateAuthStatus();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "token" || event.key === "role") {
                updateAuthStatus();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return { isLoggedIn, isAdmin, updateAuthStatus };
};
