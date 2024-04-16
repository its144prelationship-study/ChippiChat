import { CreateChat } from "../types/chat.types";
import mongoose from "mongoose";

const Chat = require("../models/ChatModel");

export const chatRepository = {
  createChat: async (body: CreateChat) => {
    try {
      const chat = await Chat.create(body);
      return chat;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  findChat: async (participants: mongoose.Types.ObjectId[]) => {
    try {
      return await Chat.findOne({ participants: participants });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
