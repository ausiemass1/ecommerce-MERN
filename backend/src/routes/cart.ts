import express from "express";
import redis from "../config/redis";
import { auth, AuthRequest } from "../middleware/auth";
import Product from "../models/Product";

const router = express.Router();

/* =========================
   ADD TO CART
========================= */
router.post("/add/:productId", auth, async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const key = `cart:${userId}`;

  const cartData = await redis.get<any>(key);

  const cart = cartData ?? {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  };

  const existingItem = cart.items.find(
    (item: any) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      productId,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  cart.totalQuantity += 1;
  cart.totalPrice += product.price;

  await redis.set(key, JSON.stringify(cart));

  res.json(cart);
});

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
