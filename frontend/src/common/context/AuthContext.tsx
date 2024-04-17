import { createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType } from "../types/AuthContextType";
import { LocalStorageUtils } from "../utils/LocalStorageUtil";

export const AuthContext = createContext<AuthContextType>({
    user_id: "",
    username: "",
    token: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const token = LocalStorageUtils.getData("token");
    if (!token) {
        window.location.href = "/login";
        return;
    }

    const decodedToken = jwtDecode<Omit<AuthContextType, "token">>(token);
    const contextValue = { ...decodedToken, token }

    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
}