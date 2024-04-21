import { useContext } from "react";
import { AuthContext } from "../../common/context/AuthContext";
import { ChatContextProvider } from "../../common/context/ChatContext";
import ChatPage from "./ChatPage";
import { OriInfo } from "../RegisterPage/components/InputForm";

export default function ChatApp() {
  const user: OriInfo = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <ChatPage />
    </ChatContextProvider>
  );
}
