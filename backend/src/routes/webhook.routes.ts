import express from "express";
import { createWebhook } from "../controllers/checkout.controller";

const router = express.Router();

router.post("/", createWebhook);

export default router;

