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

// ---------- API ROUTES (ALWAYS FIRST) ----------
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", checkoutRoutes);
app.use("/api/admin/products", adminProductRoutes);

// ---------- USER SPA ----------
const clientPath = path.join(__dirname, "../client");

// Serve user static files
app.use(express.static(clientPath));

// ---------- ADMIN SPA ----------
const adminPath = path.join(__dirname, "../admin");

// Serve admin static files
app.use("/admin", express.static(adminPath));

// ---------- SPA FALLBACKS (ORDER MATTERS) ----------

// Admin SPA fallback
app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

// User SPA fallback (everything except /api and /admin)
app.get(/^\/(?!api|admin).*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

export default app;
