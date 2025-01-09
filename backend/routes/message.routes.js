import express from "express";
import { getMessages, sendMessage, uploadMiddleware, muteConversation, currentSeenMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, uploadMiddleware, sendMessage);
router.get("/mute/:conversationId", protectRoute, muteConversation);
router.get("/seen/:id", protectRoute, currentSeenMessage);

export default router;