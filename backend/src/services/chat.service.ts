import { CreateChatRequest } from "../types/chat.types";
import { chatRepository } from "../repositories/chat.repository";

export const chatService = {
  createChat: async (body: CreateChatRequest) => {
    try {
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
  getAllGroupChats: async () => {
    try {
      const chats = await chatRepository.getAllGroupChats();
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
  joinGroupChat: async (chatId: string, userId: string) => {
    try {
      const existingChat = await chatRepository.isInGroupChat(chatId, userId);
      if (existingChat) {
        return {
          success: false,
          code: 400,
          message: "User already in chat",
        };
      }
      const chat = await chatRepository.joinGroupChat(chatId, userId);
      if (chat) {
        return {
          success: true,
          message: "User joined chat",
          data: chat,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot join chat",
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
  leaveGroupChat: async (chatId: string, userId: string) => {
    try {
      const existingChat = await chatRepository.isInGroupChat(chatId, userId);
      if (!existingChat) {
        return {
          success: false,
          code: 400,
          message: "User not in chat",
        };
      }
      const chat = await chatRepository.leaveGroupChat(chatId, userId);
      if (chat) {
        return {
          success: true,
          message: "User left chat",
          data: chat,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot leave chat",
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
};
