
import { Request, Response } from "express";
import Stripe from "stripe";

import stripe, { webhookSecret } from "../config/stripe";
import Order from "../models/ordersModel";
import redis from "../config/redis";
import { AuthRequest } from "../middleware/auth";
import { Cart } from "../types/cart";
import mongoose from "mongoose";

type CheckoutSessionWithShipping = Stripe.Checkout.Session & {
    shipping_details?: {
      name?: string;
      phone?: string | null;
      address?: Stripe.Address;
    };
  };
  

export const createWebhook = async (req: Request, res: Response) => {

  console.log("🔥🔥🔥 WEBHOOK HIT 🔥🔥🔥");
  console.log("🟢 Mongo readyState:", mongoose.connection.readyState);
    const signature = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;
  
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error("❌ Signature verification failed:", err.message);
      return res.sendStatus(400);
    }
  
    if (event.type === "checkout.session.completed") {
      try {
        const session =
          event.data.object as CheckoutSessionWithShipping;
  
        console.log("🟢 Webhook received:", session.id);
  
        // 🔒 Idempotency check
        const existingOrder = await Order.findOne({
          sessionId: session.id,
        });
  
        if (existingOrder) {
          console.log("🔎 Checking existing order for:", session.id);

          console.log("⚠️ Order already exists:", session.id);
          return res.sendStatus(200);
        }
  
        const lineItems =
          await stripe.checkout.sessions.listLineItems(session.id);
  
        await Order.create({
          sessionId: session.id,
          paymentIntentId: session.payment_intent as string,
          customerEmail: session.customer_details?.email,
          customerName: session.customer_details?.name,
          shipping: session.shipping_details ?? null,
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
  
        console.log("✅ Order saved to MongoDB");
      } catch (err) {
        console.error("❌ Mongo save failed:", err);
        return res.sendStatus(500);
      }
    }
  
    res.sendStatus(200);
  };
  