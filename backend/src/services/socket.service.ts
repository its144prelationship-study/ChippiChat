import { Socket } from "socket.io";

export const socketService = {
  onlineUsers: new Map<string, string>(),
  addOnlineUser: (socket: Socket, userId: string) => {
    let userExists = false;
    for (const existingUserInfo of Array.from(
      socketService.onlineUsers.values()
    )) {
      // Compare user info fields (example: username) to determine if it already exists
      if (existingUserInfo === userId) {
        userExists = true;
        break;
      }
    }
    if (!userExists) {
      socketService.onlineUsers.set(socket.id, userId);
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
    for (const [socketId, userId] of Array.from(socketService.onlineUsers)) {
      if (userId === user_id) {
        return socketId;
      }
    }
    return null;
  },
};
