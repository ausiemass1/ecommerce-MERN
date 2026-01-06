import express from "express";
import { auth, AuthRequest } from "../middleware/auth";
import { addToCart, getCart } from "../controllers/cart.controller";


const router = express.Router();

router.post("/add/:productId", auth, addToCart);
router.get("/", auth, getCart);

export default router;
