export const ChatService = {
  getChatLists: async (userId: string) => {
    const response = await fetch(`http://localhost:5789/api/chat/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  getAllMessages: async (chatId: string) => {
    const response = await fetch(
      `http://localhost:5789/api/message/${chatId}`,
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
      `http://localhost:5789/api/chat/members/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  },
};
