import { CreateChatRequest } from "../types/chat.types";

const Chat = require("../models/ChatModel");
const User = require("../models/UserModel");

export const chatRepository = {
  createChat: async (body: CreateChatRequest) => {
    try {
      const chat = await Chat.create(body);
      return chat;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  findChat: async (participants: string[]) => {
    try {
      return await Chat.findOne({ participants: { $all: participants } });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAllChats: async (userId: string) => {
    try {
      return await Chat.find({ participants: { $in: [userId] } });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAllGroupChats: async () => {
    try {
      return await Chat.find({ isGroup: true });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  isInGroupChat: async (chatId: string, userId: string) => {
    try {
      return await Chat.findOne({
        _id: chatId,
        participants: { $in: [userId] },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  joinGroupChat: async (chatId: string, userId: string) => {
    try {
      return await Chat.findByIdAndUpdate(
        chatId,
        { $push: { participants: userId } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  leaveGroupChat: async (chatId: string, userId: string) => {
    try {
      return await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { participants: userId } },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getGroupMembers: async (chatId: string) => {
    try {
      const chat = await Chat.findById(chatId);
      if (chat) {
        const members = await User.find({ _id: { $in: chat.participants } });
        const groupMembers = members.map((member) => ({
          id: member._id,
          name: member.username,
          profile_picture: member.profile_picture,
        }));
        console.log(groupMembers);
        return groupMembers;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
