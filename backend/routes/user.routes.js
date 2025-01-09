import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.delete("/delete", protectRoute, deleteUser); // Add this new route

export default router;