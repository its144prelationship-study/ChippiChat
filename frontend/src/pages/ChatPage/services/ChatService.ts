import { environment } from "../../../common/constants/environment";

export const ChatService = {
    getChatLists: async (userId: string) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/chat/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                return jsonResponse.data;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getAllMessages: async (chatId: string) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/message/${chatId}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            }
            );
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                return jsonResponse.data;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getAllMembers: async (chatId: string) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/chat/members/${chatId}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });
            const jsonResponse = await response.json();
            if (jsonResponse.success) {
                return jsonResponse.data;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
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
    createGroup: async (participants: string[], groupName: string, groupPicture: string) => {
        try {
            const response = await fetch(`${environment.backend.url}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    participants,
                    group_name: groupName,
                    group_picture: groupPicture,
                    background_color: "orange",
                    is_group: true,
                }),
            });
            const jsonResponse = await response.json();
            return jsonResponse.success;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    getAllUsers: async () => {
        try {
            const response = await fetch(`${environment.backend.url}/api/user/`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status !== 200) {
                throw new Error("Failed to fetch groups");
            }
            const data = await response.json();
            return data["data"];
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}