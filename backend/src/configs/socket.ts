import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Application } from "express";
import { socketService } from "../services/socket.service";
import { chatGroupMessages, groupMembers, userInfo } from "../types/user.types";

export const io = new Server();
export const connectSocket = (app: Application) => {
  const server = createServer(app);
  io.attach(server, { cors: { origin: "*" } });

  io.on("connection", (socket: Socket) => {
    console.log("New connection from user:", socket.id);
    socket.on("addOnlineUser", (userInfo: userInfo) => {
      console.log("User connected for add Online user:", userInfo.user_id);
      socketService.addOnlineUser(socket, userInfo);
      io.emit("onlineUsers", socketService.getOnlineUsers());
    });

    socket.on(
      "sendMessage",
      (
        message: chatGroupMessages,
        groupMembers: groupMembers[],
        selectedChat: string
      ) => {
        groupMembers.forEach((member: groupMembers) => {
          const socketId = socketService.getSocketId(member.id);
          if (socketId && socketId !== socket.id) {
            io.to(socketId).emit("newMessage", message, selectedChat);
          }
        });
      }
    );

    socket.on("disconnect", (userId: string) => {
      console.log("disconneted connected for add Online user:");
      socketService.removeOnlineUser(userId);
      io.emit("onlineUsers", socketService.getOnlineUsers());
    });

    socket.on("onlineUsers", () => {
      io.emit("onlineUsers", socketService.getOnlineUsers());
    });
  });

  return server;
};
