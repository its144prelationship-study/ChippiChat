import { useState } from "react";
import Chat from "./components/Chat";
import ChatLists from "./components/ChatLists";
import Rings from "../../assets/rings.svg";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState("1");
  const [createGroup, setCreateGroup] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [chatColor, setChatColor] = useState("orange");
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
      onChatClick: () => {},
    },
    {
      id: "3",
      chatname: "KanomKaiiiiiiiiii",
      last_message: "เอาไปเลย",
      last_message_time: "2024-04-10 12:00",
      unread: 0,
      is_pinned: false,
      profile_picture: "12",
      is_group: true,
      members: 3,
      onChatClick: () => {},
    },
  ];
  return (
    <main className="w-full min-h-[100vh] bg-cpc-blue">
      {(createGroup || changeColor) && (
        <div
          className="absolute inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => setCreateGroup(false)}
        />
      )}
      <div className="flex flex-row">
        <img
          src={Rings}
          alt="rings"
          className="absolute w-[6.2rem] translate-x-[32rem] translate-y-[10rem]"
        />
        <ChatLists
          chatLists={chatLists}
          setCreateGroup={setCreateGroup}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
        <Chat chatColor={chatColor} setChangeColor={setChangeColor} selectedChat={selectedChat} />
      </div>
    </main>
  );
}
