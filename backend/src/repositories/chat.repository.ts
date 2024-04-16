import { CreateChatRequest } from "../types/chat.types";

const Chat = require("../models/ChatModel");

export const chatRepository = {
  createChat: async (body: CreateChatRequest) => {
    try {
      const chat = await Chat.create(body);
      return chat;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  findChat: async (participants: string[]) => {
    try {
      return await Chat.findOne({ participants: participants });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAllChats: async (userId: string) => {
    try {
      return await Chat.find({ participants: { $in: [userId] } });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
