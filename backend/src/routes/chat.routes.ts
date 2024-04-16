import { Router } from "express";
import { chatController } from "../controllers/chat.controller";

const router = Router();

router.post("/", chatController.createChat);
router.get("/groups", chatController.getAllGroupChats);
router.put("/join", chatController.joinGroupChat);
router.put("/leave", chatController.leaveGroupChat);
router.get("/:userId", chatController.getAllChats);

export default router;
