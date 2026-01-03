"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = void 0;
const stripe_1 = __importDefault(require("../config/stripe"));
const redis_1 = __importDefault(require("../config/redis"));
const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const key = `cart:${userId}`;
        const cart = await redis_1.default.get(key);
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
        const session = await stripe_1.default.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: "http://localhost:5173/",
            cancel_url: "http://localhost:5173/cart",
        });
        res.json({ url: session.url });
    }
    catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ message: "Checkout failed" });
    }
};
exports.createCheckoutSession = createCheckoutSession;
