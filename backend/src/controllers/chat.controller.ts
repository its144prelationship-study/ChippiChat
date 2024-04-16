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
};
