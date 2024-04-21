import { useState, useEffect } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType } from "../types/AuthContextType";
import { LocalStorageUtils } from "../utils/LocalStorageUtil";
import { environment } from "../constants/environment";

export const AuthContext = createContext<AuthContextType>({
  user_id: "",
  username: "",
  profile_picture: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [contextValue, setContextValue] = useState<AuthContextType>({
    user_id: "",
    username: "",
    profile_picture: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = LocalStorageUtils.getData("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const decodedToken = jwtDecode<AuthContextType>(token);
        if (!decodedToken) {
          LocalStorageUtils.removeData("token");
          window.location.href = "/login";
          return;
        }

        const response = await fetch(`${environment.backend.url}/api/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        const user = data.data;

        const authContextValue: AuthContextType = {
          user_id: user._id,
          username: user.username,
          profile_picture: user.profile_picture,
        };

        setContextValue(authContextValue);
      } catch (err) {
        LocalStorageUtils.removeData("token");
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
