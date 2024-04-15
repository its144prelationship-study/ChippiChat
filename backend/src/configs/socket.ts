import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Application } from "express";
import { UserSocketInfo } from "../types/user.types";
import { socketService } from "../services/socket.service";

export const io = new Server();
export const connectSocket = async (app: Application) => {
    const server = createServer(app);
    io.attach(server, { cors: { origin: process.env.FRONTEND_URL } });
    
    io.on("connection", (socket: Socket) => {
        console.log("New connection from user:", socket.id);

        socket.on("addOnlineUser", (user: UserSocketInfo) => socketService.addOnlineUser(socket.id, user));
    });
};