import { CreateChatRequest } from "../types/chat.types";
import { chatRepository } from "../repositories/chat.repository";
import { messageService } from "./message.service";

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
      const mappedChats = await Promise.all(
        chats.map(async (chat) => {
          const lastMessage = await messageService.getLastMessage(chat._id);
          if (lastMessage.success && lastMessage.data) {
            return {
              id: chat._id,
              chatname: chat.group_name,
              last_message: lastMessage.data.message,
              last_message_time: lastMessage.data.timestamp,
              unread: 0,
              is_pinned: false,
              profile_picture: chat.group_picture,
              is_group: chat.is_group,
              members: chat.participants.length,
              bg_color: chat.background_color,
            };
          } else {
            return {
              id: chat._id,
              chatname: chat.group_name,
              last_message: "",
              last_message_time: "",
              unread: 0,
              is_pinned: false,
              profile_picture: chat.group_picture,
              is_group: chat.is_group,
              members: chat.participants.length,
              bg_color: chat.background_color,
            };
          }
        })
      );
      return {
        success: true,
        data: mappedChats,
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
  getGroupMembers: async (chatId: string) => {
    try {
      const members = await chatRepository.getGroupMembers(chatId);
      if (members) {
        return {
          success: true,
          data: members,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot get members",
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
