import React, { createContext, useState, useEffect } from "react";
import { OriInfo } from "../../pages/RegisterPage/components/InputForm";
import { ChatListType } from "../../pages/ChatPage/types/ChatListType";
import { ChatContextType } from "../types/ChatContextType";
import { ChatService } from "../services/ChatService";

export type groupMembers = {
  id: string;
  name: string;
  profile_picture:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14";
};

export type chatGroupMessages = {
  id: string;
  message: string;
  timestamp: Date;
};

export const ChatContext = createContext<ChatContextType>(
  {} as ChatContextType
);

export const ChatContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: OriInfo;
}) => {
  const [selectedChat, setSelectedChat] = useState("1");
  const [chatColor, setChatColor] = useState("orange");
  const [chatLists, setChatLists] = useState<ChatListType[]>([]);
  const [currentId, setCurrentId] = useState("00");
  const [groupMembers, setGroupMembers] = useState<groupMembers[]>([]);
  const [chatGroupMessages, setChatGroupMessages] = useState<
    chatGroupMessages[]
  >([]);

  useEffect(() => {
    const getChatLists = async () => {
      const response = await ChatService.getChatLists(user.user_id);
      const data = await response.json();
      if (data.success) {
        setChatLists(data);
      }
    };
    getChatLists();
    setCurrentId(user.user_id);
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat: selectedChat,
        chatColor: chatColor,
        chatLists: chatLists,
        currentId: currentId,
        groupMembers: groupMembers,
        chatGroupMessages: chatGroupMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
