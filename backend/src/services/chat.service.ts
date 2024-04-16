import { CreateChatRequest } from "../types/chat.types";
import { chatRepository } from "../repositories/chat.repository";

export const chatService = {
  createChat: async (body: CreateChatRequest) => {
    try {
      body.participants.sort();
      const existingChat = await chatRepository.findChat(body.participants);
      if (existingChat) {
        return {
          success: false,
          code: 400,
          message: "Chat already exists",
        };
      }
      const chat = await chatRepository.createChat(body);
      if (chat) {
        return {
          success: true,
          message: "Chat created",
          data: chat,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot create chat",
        };
      }
    } catch (err) {
      console.error(err.message);
      return {
        success: false,
        code: 500,
        message: "Internal server error",
      };
    }
  },
  getAllChats: async (userId: string) => {
    try {
      const chats = await chatRepository.getAllChats(userId);
      return {
        success: true,
        data: chats,
      };
    } catch (err) {
      console.error(err.message);
      return {
        success: false,
        code: 500,
        message: "Internal server error",
      };
    }
  },
};
