import { environment } from "../../../common/constants/environment";

export const SearchService = {
    getAllGroups: async () => {
        try {
            const response = await fetch(`${environment.backend.url}/api/chat/groups`,{
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
    joinGroupChat: async (chatId: string, userId: string) => {
        try {
            console.log(JSON.stringify({ chatId, userId }));
            const response = await fetch(`${environment.backend.url}/api/chat/join`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chatId, userId }),
            });
            if (response.status !== 200) {
                throw new Error("Failed to join chat");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}