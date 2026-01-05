import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth";
import cartRoutes from "./routes/cart";
import checkoutRoutes from "./routes/checkout.routes";
import adminProductRoutes from "./routes/admin/product.routes";

const app = express();

// ---------- GLOBAL MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- API ROUTES ----------
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", checkoutRoutes);
app.use("/api/admin/products", adminProductRoutes);

// ---------- ADMIN SPA ----------
const adminPath = path.join(__dirname, "../admin");

// Static assets
app.use("/admin", express.static(adminPath));

// SPA fallback (REGEX — SAFE)
app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

export default app;
