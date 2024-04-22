import { useContext } from "react";
import { ChatContextProvider } from "../common/context/ChatContext";
import ChatPage from "./ChatPage/ChatPage";
import { OriInfo } from "./RegisterPage/components/InputForm";
import SearchPage from "./SearchPage/SearchPage";
import { AuthContext } from "../common/context/AuthContext";

export default function ChatApplication({ path }: { path: string }) {
    const user: OriInfo = useContext(AuthContext);
    return <>
        <ChatContextProvider user={user}>
            {path == "/chat" ? <ChatPage/> : <SearchPage/>}
        </ChatContextProvider>
    </>;
}