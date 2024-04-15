import { UserSocketInfo } from "../types/user.types";


export const socketService = {
    onlineUsers: new Map<string, UserSocketInfo>(),
    addOnlineUser: (socket_id: string, user: UserSocketInfo) => {
        socketService.onlineUsers.set(socket_id, user);
    }
};