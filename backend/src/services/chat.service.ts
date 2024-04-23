import { CreateChatRequest } from "../types/chat.types";
import { chatRepository } from "../repositories/chat.repository";
import { messageService } from "./message.service";
import { userRepository } from "../repositories/user.repository";

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
          const existLastMessage =
            lastMessage.success && lastMessage.data
              ? lastMessage.data.message
              : "";
          const existLastMessageTime =
            lastMessage.success && lastMessage.data
              ? lastMessage.data.timestamp
              : "";
          let name = "";
          let pic = "";
          if (!chat.is_group) {
            const id = chat.participants.find((id) => id.toString() !== userId);
            const user = await userRepository.findUser(id, "");
            name = user.username;
            pic = user.profile_picture;
          } else {
            name = chat.group_name;
            pic = chat.group_picture;
          }
          return {
            id: chat._id,
            chatname: name,
            last_message: existLastMessage,
            last_message_time: existLastMessageTime,
            unread: 0,
            is_pinned: false,
            profile_picture: pic,
            is_group: chat.is_group,
            members: chat.participants.length,
            bg_color: chat.background_color,
          };
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
  getWhisperChat: async (myId: string, otherId: string) => {
    try {
      const existingChat = await chatRepository.getWhisperChat(myId, otherId);
      if (existingChat) {
        return {
          success: true,
          data: existingChat._id,
        };
      }
      const chat = await chatRepository.createChat({
        participants: [myId, otherId],
        group_picture: "1",
        background_color: "orange",
        is_group: false,
      });
      if (chat) {
        return {
          success: true,
          data: chat._id,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot get chat",
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
  updateChatColor: async (chatId: string, color: string) => {
    try {
      const chat = await chatRepository.updateChatColor(chatId, color);
      if (chat) {
        return {
          success: true,
          message: "Chat color updated",
          data: chat,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot update chat color",
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
  getChatColor: async (chatId: string) => {
    try {
      const chat = await chatRepository.getChatColor(chatId);
      if (chat) {
        return {
          success: true,
          data: chat.background_color,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot get chat color",
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
