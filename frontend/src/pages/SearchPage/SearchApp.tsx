import { useContext } from "react";
import { AuthContext } from "../../common/context/AuthContext";
import { ChatContextProvider } from "../../common/context/ChatContext";
import SearchPage from "./SearchPage";
import { OriInfo } from "../RegisterPage/components/InputForm";

export default function SearchApp() {
    const user: OriInfo = useContext(AuthContext);
    return <ChatContextProvider user={user}>
        <SearchPage />
    </ChatContextProvider>
}