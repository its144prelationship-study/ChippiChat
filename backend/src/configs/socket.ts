import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { Application } from "express";
import { socketService } from "../services/socket.service";

export const io = new Server();
export const connectSocket = (app: Application) => {
    const server = createServer(app);
    io.attach(server, { cors: { origin: "*" } });
    
    io.on("connection", (socket: Socket) => {
        console.log("New connection from user:", socket.id);

        socketService.addOnlineUser(socket);
        socketService.removeOnlineUser(socket);
    });

    return server;
};