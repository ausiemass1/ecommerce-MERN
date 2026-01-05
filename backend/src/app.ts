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

// ---------- USER SPA (ROOT) ----------
const rootPath = path.join(__dirname, "..");

// Serve user static files
app.use(express.static(rootPath));

// ---------- ADMIN SPA ----------
const adminPath = path.join(rootPath, "admin");

// Serve admin static files
app.use("/admin", express.static(adminPath));

// ---------- SPA FALLBACKS ----------

// Admin SPA fallback
app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

// User SPA fallback (everything else except /api)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

export default app;
