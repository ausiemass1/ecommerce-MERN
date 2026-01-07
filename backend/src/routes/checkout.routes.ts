import express from "express";
import { createCheckoutSession, } from "../controllers/checkout.controller";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/checkout", auth, createCheckoutSession);

export default router;
