import { RouteProps } from "react-router-dom";
import PageRedirect from "./PageRedirect";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import { AuthProvider } from "../common/context/AuthContext";
import ChatApplication from "../pages/ChatApplication";

export const getPagesData = () =>
  [
    {
      path: "/",
      element: <PageRedirect to="/login" />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/search",
      element: (
        <AuthProvider>
          <ChatApplication path="/search"/>
        </AuthProvider>
      ),
    },
    {
      path: "/chat",
      element: (
        <AuthProvider>
          <ChatApplication path="/chat"/>
        </AuthProvider>
      ),
    },
  ] as unknown as RouteProps[];
