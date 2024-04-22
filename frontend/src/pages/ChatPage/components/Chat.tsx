import { useState, useEffect, useRef, useContext } from "react";
import ProfilePicture from "../../../common/components/ProfilePicture/ProfilePicture";
import PinIcon from "../../../assets/pin-icon.svg";
import PinnedIcon from "../../../assets/pinned-icon.svg";
import SelectColorIcon from "../../../assets/select-color-icon.svg";
import SendIcon from "../../../assets/send-icon.svg";
import MyMessage from "./messages/MyMessage";
import OtherMessage from "./messages/OtherMessage";
import { ChatListType } from "../types/ChatListType";
import { ChatContext } from "../../../common/context/ChatContext";

export default function Chat({
  chatColor,
  setChangeColor,
  selectedChat,
  chatInfo,
  groupMembers,
  chatMessages,
  isPinned,
  setIsPinned,
  userId,
}: {
  chatColor: string;
  setChangeColor: (changeColor: boolean) => void;
  selectedChat: string;
  chatInfo: ChatListType | null;
  groupMembers: GroupMemberType[];
  chatMessages: ChatMessageType[];
  isPinned: boolean;
  setIsPinned: (isPinned: boolean) => void;
  userId: string;
}) {
  const chat = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  let bgColor = "bg-[#E2E7F7]";
  let bgTopColor = "bg-cpc-orange";
  switch (chatColor) {
    case "orange":
      bgColor = "bg-[#E2E7F7]";
      bgTopColor = "bg-cpc-orange";
      break;
    case "pink":
      bgColor = "bg-[#FFE6E9]";
      bgTopColor = "bg-[#FF8897]";
      break;
    case "purple":
      bgColor = "bg-[#E5DFFF]";
      bgTopColor = "bg-[#A791FF]";
      break;
    case "green":
      bgColor = "bg-[#E7F7E2]";
      bgTopColor = "bg-[#A2D92E]";
      break;
    case "yellow":
      bgColor = "bg-[#FFFDD6]";
      bgTopColor = "bg-[#FFFA7C]";
      break;
  }
  const showedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const sendMessage = () => {
    console.log(message);
    chat.sendMessage(message, userId, selectedChat);
    setMessage("");
  };
  const timeCompontent = (timestamp: Date) => {
    const text =
      timestamp.getDate() == new Date().getDate()
        ? "Today"
        : timestamp.getDate() == new Date().getDate() - 1
          ? "Yesterday"
          : timestamp.toLocaleDateString("en-EN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
    return (
      <div className="w-full flex justify-center">
        <div className="inline-block text text-sm text-center font-ibm-plex-mono py-1 px-3 bg-[#D9D9D9]/70 rounded-full">
          {text}
        </div>
      </div>
    );
  };
  const allMessages = chatMessages.map((message, index) => {
    const current: Date = new Date(message.timestamp);
    let previousDate = null;

    if (index > 0) {
      previousDate = new Date(chatMessages[index - 1].timestamp);
    }
    if (message.id === userId) {
      return (
        <>
          {previousDate &&
            previousDate.getDate() !== current.getDate() &&
            timeCompontent(current)}
          {!previousDate && timeCompontent(current)}
          <MyMessage
            key={index}
            message={message.message}
            time={showedTime(message.timestamp)}
          />
        </>
      );
    } else {
      const member = groupMembers.find((member) => member.id === message.id);
      if (member) {
        return (
          <>
            {previousDate &&
              previousDate.getDate() !== current.getDate() &&
              timeCompontent(current)}
            {!previousDate && timeCompontent(current)}
            <OtherMessage
              key={index}
              username={chatInfo?.is_group ? member.username : null}
              profile_picture={member.profile_picture}
              message={message.message}
              time={showedTime(message.timestamp)}
            />
          </>
        );
      }
      return null;
    }
  });

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    };
    scrollToBottom();
  }, []);

  return (
    <div className="flex flex-row">
      <div
        className={`w-[60rem] h-[40rem] my-5 mr-16 ml-5 ${bgColor} rounded-md shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.25)]`}
      >
        <div
          className={`w-full h-[4.5rem] ${bgTopColor} rounded-t-md shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.25)] flex flex-row p-2 justify-items-center justify-between items-center px-4`}
        >
          <span className="w-4/5 flex flex-row items-center">
            {chatInfo?.is_group && (
              <ProfilePicture
                pic={chatInfo?.profile_picture}
                className="h-14 w-14 mr-3"
              />
            )}
            <p className="text-2xl font-dm-mono font-normal">
              {(chatInfo?.chatname ?? "").length > 30
                ? `${chatInfo?.chatname.slice(0, 30)}...`
                : chatInfo?.chatname}
            </p>
            {chatInfo?.is_group && (
              <p className="text-2xl font-dm-mono font-normal">{` (${chatInfo?.members})`}</p>
            )}
          </span>
          <span className="flex flex-row">
            <img
              src={isPinned ? PinnedIcon : PinIcon}
              alt="pin"
              className="h-10 w-10 mr-2 cursor-pointer"
              onClick={() => setIsPinned(!isPinned)}
            />
            <img
              src={SelectColorIcon}
              alt="select color"
              className="h-10 w-10 cursor-pointer"
              onClick={() => setChangeColor(true)}
            />
          </span>
        </div>
        <div
          className="w-full h-[29rem] flex flex-col py-3 px-8 justify-start overflow-y-auto"
        >
          {allMessages}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="w-full h-[6.5rem] border-t-[1px] border-black flex flex-row p-2 justify-between px-8">
          <textarea
            placeholder="Enter your text here"
            value={message}
            className="w-11/12 h-auto min-h-10 bg-transparent font-ibm-plex-mono text-black text-lg placeholder:text-[#888888] focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.shiftKey)) {
                e.preventDefault();
                setMessage((prev) => `${prev}\n`);
              } else if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            onSubmit={() => sendMessage()}
            onChange={(e) => setMessage(e.target.value)}
          />
          <img
            src={SendIcon}
            alt="send"
            className="h-10 w-10 cursor-pointer"
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </div>
  );
}
