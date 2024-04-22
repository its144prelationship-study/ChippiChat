import { Router } from "express";
import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post("/", chatController.createChat);
router.get("/groups", chatController.getAllGroupChats);
router.get("/members/:chatId", chatController.getGroupMembers);
router.put("/join", chatController.joinGroupChat);
router.put("/leave", chatController.leaveGroupChat);
router.post("/whisper", chatController.getWhisperChat);
router.get("/:userId", chatController.getAllChats);

export default router;
