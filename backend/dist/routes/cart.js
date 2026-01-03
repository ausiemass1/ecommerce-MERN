"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = __importDefault(require("../config/redis"));
const auth_1 = require("../middleware/auth");
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
/* =========================
   ADD TO CART
========================= */
router.post("/add/:productId", auth_1.auth, async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    const product = await Product_1.default.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    const key = `cart:${userId}`;
    const cartData = await redis_1.default.get(key);
    const cart = cartData ?? {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    };
    const existingItem = cart.items.find((item) => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.items.push({
            productId,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    }
    cart.totalQuantity += 1;
    cart.totalPrice += product.price;
    await redis_1.default.set(key, JSON.stringify(cart), { ex: 60 } // 1 minute (testing)
    );
    res.json(cart);
});
/* =========================
   GET CART
========================= */
router.get("/", auth_1.auth, async (req, res) => {
    const userId = req.user.id;
    const key = `cart:${userId}`;
    const cartData = await redis_1.default.get(key);
    const cart = cartData ?? {
        items: [],
        totalQuantity: 0,
        totalPrice: 0
    };
    res.json(cart);
});
exports.default = router;
