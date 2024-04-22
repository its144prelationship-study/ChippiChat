import { CreateMessageRequest } from "../types/message.types";
import { messageRepository } from "../repositories/message.repository";
import { timeStamp } from "console";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return `${formattedDate} ${formattedTime}`;
}

export const messageService = {
  createMessage: async (body: CreateMessageRequest) => {
    try {
      const message = await messageRepository.createMessage(body);
      if (message) {
        return {
          success: true,
          message: "Message sent",
          data: {
            id: message.sender_id,
            message: message.message_text,
            timestamp: formatTimestamp(message.send_at),
          },
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
      const mappedMessages = messages.map((message) => ({
        id: message.sender_id,
        message: message.message_text,
        timestamp: formatTimestamp(message.send_at),
      }));
      return {
        success: true,
        data: mappedMessages,
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
  getLastMessage: async (chatId: string) => {
    try {
      const message = await messageRepository.getLastMessage(chatId);
      if (message) {
        return {
          success: true,
          data: {
            id: message.sender_id,
            message: message.message_text,
            timestamp: formatTimestamp(message.send_at),
          },
        };
      } else {
        return {
          success: false,
          code: 404,
          message: "No messages found",
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
