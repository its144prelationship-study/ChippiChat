import { io } from "socket.io-client";
import { environment } from "../common/constants/environment";

const socket = io(environment.backend.url);

export default socket;
