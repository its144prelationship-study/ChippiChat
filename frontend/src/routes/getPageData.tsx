import { RouteProps } from "react-router-dom";
import PageRedirect from "./PageRedirect";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import ChatPage from "../pages/ChatPage/ChatPage";
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
    element: <SearchPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  ] as unknown as RouteProps[];
