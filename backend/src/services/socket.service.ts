export const socketService = {
    onlineUsers: new Map<string, string>(),
    addOnlineUser: (socket_id: string, username: string) => {
        socketService.onlineUsers.set(socket_id, username);
        console.log('online users:', socketService.onlineUsers);
    },
    removeOnlineUser: (socket_id: string) => {
        socketService.onlineUsers.delete(socket_id);
        console.log('online users:', socketService.onlineUsers);
    },
};