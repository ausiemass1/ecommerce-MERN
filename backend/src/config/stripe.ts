import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default stripe;
