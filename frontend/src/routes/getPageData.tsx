import { RouteProps } from "react-router-dom";
import PageRedirect from "./PageRedirect";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchApp from "../pages/SearchPage/SearchApp";
import ChatApp from "../pages/ChatPage/ChatApp";
import { AuthProvider } from "../common/context/AuthContext";

export const getPagesData = () =>
  [{
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
    element: <AuthProvider><SearchApp /></AuthProvider>,
  },
  {
    path: "/chat",
    element: <AuthProvider><ChatApp /></AuthProvider>,
  },
  ] as unknown as RouteProps[];
