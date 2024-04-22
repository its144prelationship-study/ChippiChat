import { Socket } from "socket.io";
import { userInfo } from "../types/user.types";

export const socketService = {
  onlineUsers: new Map<string, userInfo>(),
  addOnlineUser: (socket: Socket, user: userInfo) => {
    // let userExists = false;
    // for (const existingUserInfo of Array.from(
    //   socketService.onlineUsers.values()
    // )) {
    //   // Compare user info fields (example: username) to determine if it already exists
    //   if (existingUserInfo === userId) {
    //     userExists = true;
    //     break;
    //   }
    // }
    // if (!userExists) {
    //   socketService.onlineUsers.set(socket.id, userId);
    // }
    console.log(user);
    user.socket_id = socket.id;
    socketService.onlineUsers.set(user.user_id, user);
    console.log("online users:", socketService.onlineUsers);
  },
  removeOnlineUser: (userId: string) => {
    socketService.onlineUsers.delete(userId);
    console.log("online users:", socketService.onlineUsers);
  },
  getOnlineUsers: () => {
    console.log("online users:", socketService.onlineUsers);
    return Array.from(socketService.onlineUsers.values());
  },
  getSocketId: (user_id: string) => {
    for (const [userId, userInfo] of Array.from(socketService.onlineUsers)) {
      if (userId === user_id) {
        return userInfo.socket_id;
      }
    }
    return null;
  },
};
