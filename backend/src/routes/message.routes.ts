import { Router } from "express";
import { messageController } from "../controllers/message.controller";

const router = Router();

router.post("/", messageController.createMessage);
router.get("/:chatId", messageController.getMessages);

export default router;
