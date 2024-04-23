import { useState, useEffect, useContext } from "react";
import Chat from "./components/Chat";
import ChatLists from "./components/ChatLists";
import CreateGroupModal from "./components/CreateGroupModal";
import SelectedChatColorModal from "./components/SelectedChatColorModal";
import NavBar from "../../common/components/NavBar/NavBar";
import { OriInfo } from "../RegisterPage/components/InputForm";
import { AuthContext } from "../../common/context/AuthContext";
import { ChatContext } from "../../common/context/ChatContext";
import { ChatContextType } from "../../common/types/ChatContextType";

export default function ChatPage() {
  const user: OriInfo = useContext(AuthContext);
  const chat: ChatContextType = useContext(ChatContext);
  const [createGroup, setCreateGroup] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [chatColor, setChatColor] = useState("orange");
  const [isPinned, setIsPinned] = useState(false);
  // console.log(chat);
  // useEffect(() => {
  //   for (let i = 0; i < chat.chatLists.length; i++) {
  //     if (chat.chatLists[i].id === chat.selectedChat) {
  //       setChatColor(chat.chatLists[i].bg_color);
  //       setIsPinned(chat.chatLists[i].is_pinned);
  //       break;
  //     }
  //   }
  // }, [chat.chatLists, chat.selectedChat, chatColor]);
  useEffect(() => {
    chat.updateSelectedChat(chat.selectedChat);
    // console.log(chat.chatColor, chat.selectedChat);
  }, [chat]);
  // useEffect(() => {
  //   chat.setChatColor(chatColor);
  // }, [chatColor]);
  return (
    <main className="w-full min-h-[100vh] bg-cpc-blue">
      <NavBar menuFocus="chat" user={user} />
      {(createGroup || changeColor) && (
        <div
          className="absolute inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => {
            setCreateGroup(false);
            setChangeColor(false);
          }}
        />
      )}
      {createGroup && <CreateGroupModal setCreateGroup={setCreateGroup} />}
      {changeColor && (
        <SelectedChatColorModal
          chatColor={chatColor}
          setChatColor={setChatColor}
          setChangeColor={setChangeColor}
        />
      )}
      <div className="flex flex-row">
        <ChatLists
          chatLists={chat.chatLists}
          setCreateGroup={setCreateGroup}
          selectedChat={chat.selectedChat}
          setSelectedChat={(e) => chat.updateSelectedChat(e)}
        />
        <Chat
          chatColor={chatColor}
          setChangeColor={setChangeColor}
          selectedChat={chat.selectedChat}
          chatInfo={
            chat.chatLists.find((c) => c.id === chat.selectedChat) ?? null
          }
          groupMembers={chat.groupMembers as GroupMemberType[]}
          chatMessages={chat.chatGroupMessages as any[]}
          isPinned={isPinned}
          setIsPinned={setIsPinned}
          userId={user.user_id}
        />
      </div>
    </main>
  );
}
