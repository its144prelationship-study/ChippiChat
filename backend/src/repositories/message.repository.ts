import { CreateMessageRequest } from "../types/message.types";

const Message = require("../models/MessageModel");

export const messageRepository = {
  createMessage: async (body: CreateMessageRequest) => {
    try {
      const message = await Message.create(body);
      return message;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMessages: async (chatId: string) => {
    try {
      return await Message.find({ chat_id: chatId });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
