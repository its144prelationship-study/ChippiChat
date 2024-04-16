import { Request, Response } from "express";
import { messageService } from "../services/message.service";

export const messageController = {
  createMessage: async (req: Request, res: Response) => {
    try {
      const message = await messageService.createMessage(req.body);
      if (message.success) {
        res.status(201).json(message);
      } else {
        res.status(message.code).json({
          success: false,
          message: message.message,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  getMessages: async (req: Request, res: Response) => {
    try {
      const messages = await messageService.getMessages(req.params.chatId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
};
