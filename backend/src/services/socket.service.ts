import { Socket } from 'socket.io';
import { OnlineUser } from '../types/user.types';

export const socketService = {
    onlineUsers: new Map<string, OnlineUser>(),
    addOnlineUser: (socket: Socket) => {
        socket.on('addOnlineUser', (userInfo: OnlineUser) => {
            socketService.onlineUsers.set(socket.id, userInfo);
            console.log('online users:', socketService.onlineUsers);
        });
    },
    removeOnlineUser: (socket: Socket) => {
        socket.on('removeOnlineUser', () => {
            socketService.onlineUsers.delete(socket.id);
            console.log('online users:', socketService.onlineUsers);
        });
    },
};