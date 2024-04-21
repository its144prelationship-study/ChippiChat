import React, { createContext, useState, useEffect, useCallback } from "react";
import { OriInfo } from "../../pages/RegisterPage/components/InputForm";
import { ChatListType } from "../../pages/ChatPage/types/ChatListType";
import { ChatContextType } from "../types/ChatContextType";
import { ChatService } from "../../pages/ChatPage/services/ChatService";
import socket from "../socket";
import { Socket } from "socket.io-client";

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

export type OnlineUser = {
  user_id: string;
  username: string;
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
  const [newMessage, setNewMessage] = useState<chatGroupMessages>();
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Map<string, OnlineUser>>();
  //connect to socket
  useEffect(() => {
    setChatSocket(socket);
    return () => {
      socket?.disconnect();
    };
  }, [user]);
  //add online user
  useEffect(() => {
    if (chatSocket === null) return;
    socket.emit("addOnlineUser", {
      user_id: user.user_id,
      username: user.username,
    });
    socket.on("onlineUsers", (users: Map<string, OnlineUser>) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.off("onlineUsers");
    };
  }, [chatSocket]);
  //send message
  useEffect(() => {
    if (chatSocket === null) return;
    socket.emit("sendMessage", { ...newMessage, groupMembers, selectedChat });
  }, [newMessage]);
  //receive message
  useEffect(() => {
    if (chatSocket === null) return;
    socket.on("newMessage", (message: chatGroupMessages, chatId: string) => {
      if (chatId === selectedChat) {
        setChatGroupMessages((prev) => [...prev, message]);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedChat]);
  //get message
  useEffect(() => {
    const getChatLists = async () => {
      const response = await ChatService.getChatLists(user.user_id);
      const data = await response.json();
      if (data.success) {
        setChatLists(data.data);
      }
    };
    getChatLists();
    setCurrentId(user.user_id);
  }, [user]);
  //get messages and members
  useEffect(() => {
    const getMessages = async () => {
      const response = await ChatService.getAllMessages(selectedChat);
      const data = await response.json();
      if (data.success) {
        setChatGroupMessages(data.data);
      }
    };
    const getAllMembers = async () => {
      const response = await ChatService.getAllMembers(selectedChat);
      const data = await response.json();
      if (data.success) {
        setGroupMembers(data.data);
      }
    };
    getAllMembers();
    getMessages();
  }, [selectedChat]);
  //update selected chat
  const updateSelectedChat = useCallback((chatId: string) => {
    setSelectedChat(chatId);
  }, []);
  //send message
  const sendMessage = useCallback(
    async (
      message: string,
      senderId: string,
      chatId: string,
      setMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {
      const response = await ChatService.sendMessage(chatId, message, senderId);
      setMessage("");
      setNewMessage(response.data);
      setChatGroupMessages((prev) => [...prev, response.data]);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        selectedChat: selectedChat,
        chatColor: chatColor,
        chatLists: chatLists,
        currentId: currentId,
        groupMembers: groupMembers,
        chatGroupMessages: chatGroupMessages,
        newMessage: newMessage,
        chatSocket: chatSocket,
        onlineUsers: onlineUsers,
        updateSelectedChat: updateSelectedChat,
        sendMessage: sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
