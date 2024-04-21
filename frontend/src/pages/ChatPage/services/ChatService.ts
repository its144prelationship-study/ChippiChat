import { environment } from "../../../common/constants/environment";

export const ChatService = {
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