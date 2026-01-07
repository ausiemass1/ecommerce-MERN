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

      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173/cart",

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

/* ---------------------------------------------
   STRIPE WEBHOOK HANDLER
---------------------------------------------- */
export const createWebhook = async (req: Request, res: Response) => {
  console.log("🔥 WEBHOOK HIT");
  console.log("🔥🔥🔥 WEBHOOK ENDPOINT HIT 🔥🔥🔥");
  console.log("🟢 Mongoose readyState:", mongoose.connection.readyState);

  const signature = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err: any) {
    console.error("❌ Signature verification failed:", err.message);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session & {
      shipping_details?: {
        name?: string;
        phone?: string | null;
        address?: Stripe.Address;
      };
    };

    console.log("🟢 Session completed:", session.id);

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const order = await Order.create({
      sessionId: session.id,
      paymentIntentId: session.payment_intent as string,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      shipping: session.shipping_details,
      items: lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
        priceId: item.price?.id,
      })),
      currency: session.currency,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
    });

    console.log("✅ Order saved:", order._id);
  }

  res.sendStatus(200);
};
