import { Request, Response } from "express";
import Stripe from "stripe";

import stripe, { webhookSecret } from "../config/stripe";
import Order from "../models/ordersModel";
import redis from "../config/redis";
import { AuthRequest } from "../middleware/auth";
import { Cart } from "../types/cart";
import mongoose from "mongoose";

/* ---------------------------------------------
   CREATE CHECKOUT SESSION
---------------------------------------------- */
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

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "nzd",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      shipping_address_collection: {
        allowed_countries: ["NZ", "US"],
      },

      // success_url: `http://localhost:5173/`,
      // cancel_url: `http://localhost:5173/cart`,
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,

      metadata: {
        userId,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ message: "Checkout failed" });
  }
};
