import { CreateMessageRequest } from "../types/message.types";
import { messageRepository } from "../repositories/message.repository";

export const messageService = {
  createMessage: async (body: CreateMessageRequest) => {
    try {
      const message = await messageRepository.createMessage(body);
      if (message) {
        return {
          success: true,
          message: "Message sent",
          data: message,
        };
      } else {
        return {
          success: false,
          code: 500,
          message: "Cannot send message",
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
  getMessages: async (chatId: string) => {
    try {
      const messages = await messageRepository.getMessages(chatId);
      return {
        success: true,
        data: messages,
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
