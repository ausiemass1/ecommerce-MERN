import { Response } from "express";
import stripe from "../config/stripe";
import redis from "../config/redis";
import { AuthRequest } from "../middleware/auth";

import { Cart } from "../types/cart";

export const createCheckoutSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const key = `cart:${userId}`;

    const cart = await redis.get<Cart>(key);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const lineItems = cart.items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Checkout failed" });
  }
};
