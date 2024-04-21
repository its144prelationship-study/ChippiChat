import { environment } from "../../common/constants/environment";

export const ChatService = {
  getChatLists: async (userId: string) => {
    const response = await fetch(`${environment.backend.url}/api/chat/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  getAllMessages: async (chatId: string) => {
    const response = await fetch(
      `${environment.backend.url}/api/message/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  },
  getAllMembers: async (chatId: string) => {
    const response = await fetch(
      `${environment.backend.url}/api/chat/members/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  },
  sendMessage: async (chatId: string, message: string, senderId: string) => {
    const response = await fetch(`${environment.backend.url}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        sender_id: senderId,
        message_text: message,
      }),
    });
    return response.json();
  },
};
