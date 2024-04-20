import { io } from "socket.io-client";

const socket = io("http://localhost:5789");

export default socket;
