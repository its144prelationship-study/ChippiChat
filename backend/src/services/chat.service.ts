import { CreateChatRequest, CreateChat } from "../types/chat.types";
import { chatRepository } from "../repositories/chat.repository";
import mongoose from "mongoose";

export const chatService = {
  createChat: async (body: CreateChatRequest) => {
    try {
      const participantIds = body.participants.map(
        (participantId) => new mongoose.Types.ObjectId(participantId)
      );
      const newChat: CreateChat = {
        participants: participantIds,
        group_name: body.group_name,
        group_picture: body.group_picture,
        background_color: body.background_color,
        is_group: body.is_group,
      };
      newChat.participants.sort();
      const existingChat = await chatRepository.findChat(newChat.participants);
      if (existingChat) {
        return {
          success: false,
          code: 400,
          message: "Chat already exists",
        };
      }
      const chat = await chatRepository.createChat(newChat);
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
};
