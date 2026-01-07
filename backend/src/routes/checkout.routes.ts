import express from "express";
import { createCheckoutSession, createWebhook } from "../controllers/checkout.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/checkout", auth, createCheckoutSession);
router.post(
    "/api/webhooks/stripe",
    express.raw({ type: "application/json" }),
    createWebhook
  );

export default router;
