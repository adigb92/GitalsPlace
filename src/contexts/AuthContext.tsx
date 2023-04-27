import React, { createContext, useContext, FunctionComponent } from "react";
import { useAuthStatus } from "../hooks/useAuthStatus";

interface AuthContextData {
    isLoggedIn: boolean;
    isAdmin: boolean;
    updateAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextData>({
    isLoggedIn: false,
    isAdmin: false,
    updateAuthStatus: () => { },
});

export const useAuth = () => useContext(AuthContext);

interface AuthContextProps {
    children: React.ReactNode;
}

export const AuthProvider: FunctionComponent<AuthContextProps> = ({ children }) => {
    const { isLoggedIn, isAdmin, updateAuthStatus } = useAuthStatus();

    React.useEffect(() => {
        console.log("Update auth status:", { isLoggedIn, isAdmin });
    }, [isLoggedIn, isAdmin]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, updateAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
