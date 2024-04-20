import { Socket } from "socket.io";
import { OnlineUser } from "../types/user.types";

export const socketService = {
  onlineUsers: new Map<string, OnlineUser>(),
  addOnlineUser: (socket: Socket, userInfo: OnlineUser) => {
    let userExists = false;
    for (const existingUserInfo of Array.from(
      socketService.onlineUsers.values()
    )) {
      // Compare user info fields (example: username) to determine if it already exists
      if (existingUserInfo.user_id === userInfo.user_id) {
        userExists = true;
        break;
      }
    }
    if (!userExists) {
      socketService.onlineUsers.set(socket.id, userInfo);
    }
    console.log("online users:", socketService.onlineUsers);
  },
  removeOnlineUser: (socket: Socket) => {
    socketService.onlineUsers.delete(socket.id);
    console.log("online users:", socketService.onlineUsers);
  },
  getOnlineUsers: () => {
    return socketService.onlineUsers;
  },
  getSocketId: (user_id: string) => {
    for (const [socketId, userInfo] of Array.from(socketService.onlineUsers)) {
      if (userInfo.user_id === user_id) {
        return socketId;
      }
    }
    return null;
  },
};
