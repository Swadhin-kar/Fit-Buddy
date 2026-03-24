import express from "express";
import { getTodayLog, updateLog, getLogs } from "../controller/log.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/today", protect, getTodayLog);
router.post("/", protect, updateLog);
router.get("/history", protect, getLogs);

export default router;