import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Application } from "express";
import { socketService } from "../services/socket.service";
import {
  chatGroupMessages,
  groupMembers,
  OnlineUser,
} from "../types/user.types";

export const io = new Server();
export const connectSocket = (app: Application) => {
  const server = createServer(app);
  io.attach(server, { cors: { origin: "*" } });

  io.on("connection", (socket: Socket) => {
    console.log("New connection from user:", socket.id);
    socket.on("addOnlineUser", (user: OnlineUser) => {
      socketService.addOnlineUser(socket, user);
      io.emit("onlineUsers", socketService.getOnlineUsers());
    });

    socket.on(
      "sendMessage",
      (
        message: chatGroupMessages,
        groupMembers: groupMembers[],
        selectedChat: string
      ) => {
        groupMembers.forEach((member) => {
          const socketId = socketService.getSocketId(member.id);
          if (socketId) {
            io.to(socketId).emit("newMessage", message, selectedChat);
          }
        });
      }
    );

    socket.on("disconnect", () => {
      socketService.removeOnlineUser(socket);
      io.emit("onlineUsers", socketService.getOnlineUsers());
    });
  });

  return server;
};
