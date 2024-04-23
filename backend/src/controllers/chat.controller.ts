import { Request, Response } from "express";
import { chatService } from "../services/chat.service";

export const chatController = {
  createChat: async (req: Request, res: Response) => {
    try {
      if (!req.body.participants) {
        return res.status(400).json({
          success: false,
          message: "Participants are required",
        });
      }

      if (req.body.participants.length < 2) {
        return res.status(400).json({
          success: false,
          message: "At least two participants are required",
        });
      }

      const chat = await chatService.createChat(req.body);
      if (chat.success) {
        res.status(201).json(chat);
      } else {
        res.status(chat.code).json({
          success: false,
          message: chat.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  getAllChats: async (req: Request, res: Response) => {
    try {
      const chats = await chatService.getAllChats(req.params.userId);
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  getAllGroupChats: async (req: Request, res: Response) => {
    try {
      const chats = await chatService.getAllGroupChats();
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  joinGroupChat: async (req: Request, res: Response) => {
    try {
      if (!req.body.chatId) {
        return res.status(400).json({
          success: false,
          message: "Chat ID is required",
        });
      }
      if (!req.body.userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const chat = await chatService.joinGroupChat(
        req.body.chatId,
        req.body.userId
      );
      if (chat.success) {
        res.status(200).json(chat);
      } else {
        res.status(chat.code).json({
          success: false,
          message: chat.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  leaveGroupChat: async (req: Request, res: Response) => {
    try {
      if (!req.body.chatId) {
        return res.status(400).json({
          success: false,
          message: "Chat ID is required",
        });
      }
      if (!req.body.userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const chat = await chatService.leaveGroupChat(
        req.body.chatId,
        req.body.userId
      );
      if (chat.success) {
        res.status(200).json(chat);
      } else {
        res.status(chat.code).json({
          success: false,
          message: chat.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  getGroupMembers: async (req: Request, res: Response) => {
    try {
      if (!req.params.chatId) {
        return res.status(400).json({
          success: false,
          message: "Chat ID is required",
        });
      }
      const members = await chatService.getGroupMembers(req.params.chatId);
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  getWhisperChat: async (req: Request, res: Response) => {
    try {
      if (!req.body.myId) {
        return res.status(400).json({
          success: false,
          message: "My ID is required",
        });
      }
      if (!req.body.otherId) {
        return res.status(400).json({
          success: false,
          message: "Other ID is required",
        });
      }
      const chat = await chatService.getWhisperChat(
        req.body.myId,
        req.body.otherId
      );
      if (chat.success) {
        res.status(200).json(chat);
      } else {
        res.status(chat.code).json({
          success: false,
          message: chat.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  updateChatColor: async (req: Request, res: Response) => {
    try {
      if (!req.params.chatId) {
        return res.status(400).json({
          success: false,
          message: "Chat ID is required",
        });
      }
      if (!req.body.color) {
        return res.status(400).json({
          success: false,
          message: "Color is required",
        });
      }
      const chat = await chatService.updateChatColor(
        req.params.chatId,
        req.body.color
      );
      if (chat.success) {
        res.status(200).json(chat);
      } else {
        res.status(chat.code).json({
          success: false,
          message: chat.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  getChatColor: async (req: Request, res: Response) => {
    try {
      if (!req.params.chatId) {
        return res.status(400).json({
          success: false,
          message: "Chat ID is required",
        });
      }
      const color = await chatService.getChatColor(req.params.chatId);
      res.status(200).json(color);
      console.log("color", color);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
};
