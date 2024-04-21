import { useState, useEffect, useContext } from "react";
import Chat from "./components/Chat";
import ChatLists from "./components/ChatLists";
import CreateGroupModal from "./components/CreateGroupModal";
import SelectedChatColorModal from "./components/SelectedChatColorModal";
import NavBar from "../../common/components/NavBar/NavBar";
import { OriInfo } from "../RegisterPage/components/InputForm";
import { AuthContext, AuthProvider } from "../../common/context/AuthContext";
import { ChatListType } from "./types/ChatListType";
import { ChatContext, ChatContextProvider } from "../../common/context/ChatContext";
import { ChatContextType } from "../../common/types/ChatContextType";

export default function ChatPage() {
  const user: OriInfo = useContext(AuthContext);
  const chat: ChatContextType = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState("1");
  const [createGroup, setCreateGroup] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [chatColor, setChatColor] = useState("orange");
  const [isPinned, setIsPinned] = useState(false);
  console.log(chat, user);
  const chatLists: ChatListType[] = [
    {
      id: "1",
      chatname: "mhadaeng",
      last_message: "พี่สาวคนสวยฮาฟ",
      last_message_time: "2024-04-16 12:00",
      unread: 3,
      is_pinned: true,
      profile_picture: "6",
      is_group: false,
      members: 2,
      bg_color: "orange",
      onChatClick: () => {},
    },
    {
      id: "2",
      chatname: "WoonHakki",
      last_message: "อุนักๆ อุนักๆๆ อุนนานัก",
      last_message_time: "2024-04-15 12:00",
      unread: 2,
      is_pinned: false,
      profile_picture: "1",
      is_group: false,
      members: 2,
      bg_color: "pink",
      onChatClick: () => {},
    },
    {
      id: "3",
      chatname: "KanomKaiiiiiiiiiiiiiiiiiiiiiiiii",
      last_message: "เอาไปเลย",
      last_message_time: "2024-04-10 12:00",
      unread: 0,
      is_pinned: false,
      profile_picture: "12",
      is_group: true,
      members: 3,
      bg_color: "yellow",
      onChatClick: () => {},
    },
  ];
  const currentId = "00";
  const chatMessages = [
    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:00",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:01",
    },
    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:03",
    },

    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:03",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:03",
    },
    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:04",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:04",
    },
  ];
  const groupMembers = [
    {
      id: "00",
      profile_picture: "1",
      username: "mhadeang0",
    },
    {
      id: "11",
      profile_picture: "2",
      username: "mhadeang1",
    },
    {
      id: "22",
      profile_picture: "3",
      username: "mhadeang2",
    },
  ];
  const chatGroupMessages = [
    {
      id: "00",
      message:
        "hihihihihihihihihihihihihihi hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:00",
    },
    {
      id: "11",
      message:
        "hihihihihihihihihihihihihihi hihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:01",
    },
    {
      id: "22",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "22",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-16 11:02",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-17 11:03",
    },

    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-17 11:03",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-18 11:03",
    },
    {
      id: "00",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-18 11:04",
    },
    {
      id: "11",
      message: "hihihihihihihihihihihihi",
      timestamp: "2024-04-18 11:04",
    },
  ];
  useEffect(() => {
    for (let i = 0; i < chatLists.length; i++) {
      if (chatLists[i].id === selectedChat) {
        setChatColor(chatLists[i].bg_color);
        setIsPinned(chatLists[i].is_pinned);
        break;
      }
    }
  }, [selectedChat, chatColor]);
  return (
    <main className="w-full min-h-[100vh] bg-cpc-blue">
      <AuthProvider>
        <ChatContextProvider user={user}>
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
              chatLists={chatLists}
              setCreateGroup={setCreateGroup}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
            <Chat
              chatColor={chatColor}
              setChangeColor={setChangeColor}
              selectedChat={selectedChat}
              chatInfo={
                chatLists.find((chat) => chat.id === selectedChat) ?? null
              }
              groupMembers={groupMembers}
              chatMessages={chatGroupMessages}
              isPinned={isPinned}
              setIsPinned={setIsPinned}
              userId={currentId}
            />
          </div>
        </ChatContextProvider>
      </AuthProvider>
    </main>
  );
}
