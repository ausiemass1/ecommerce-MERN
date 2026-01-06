import express from "express";
import redis from "../config/redis";
import { auth, AuthRequest } from "../middleware/auth";
import { addToCart } from "../controllers/cart.controller";

const router = express.Router();

/* =========================
   ADD TO CART
========================= */
router.post("/add/:productId", auth, addToCart);

/* =========================
   GET CART
========================= */
router.get("/", auth, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const key = `cart:${userId}`;
  const cartData = await redis.get<any>(key);

  const cart = cartData ?? {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  };
  

  res.json(cart);
});








export default router;
