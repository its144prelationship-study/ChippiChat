import { Router } from "express";
import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post("/create", chatController.createChat);

export default router;
