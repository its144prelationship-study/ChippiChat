import { createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType } from "../types/AuthContextType";
import { LocalStorageUtils } from "../utils/LocalStorageUtil";

export const AuthContext = createContext<AuthContextType>({
    user_id: "",
    username: "",
    profile_picture: ""
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const token = LocalStorageUtils.getData("token");
    if (!token) {
        window.location.href = "/login";
        return;
    }

    try {
        const decodedToken = jwtDecode<AuthContextType>(token);
        const contextValue = { ...decodedToken };

        return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
    } catch (err) {
        LocalStorageUtils.removeData("token");
        window.location.href = "/login";
        return;
    }
}