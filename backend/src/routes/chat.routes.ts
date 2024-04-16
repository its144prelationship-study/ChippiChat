import { Router } from "express";
import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post("/", chatController.createChat);
router.get("/:userId", chatController.getAllChats);

export default router;
