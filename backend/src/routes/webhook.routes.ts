import express from "express";
import { createWebhook } from "../controllers/webhook.controller";

const router = express.Router();

router.post("/", createWebhook);

export default router;


