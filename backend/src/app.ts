import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/user.product.routes";
import authRoutes from "./routes/auth";
import cartRoutes from "./routes/cart";
import checkoutRoutes from "./routes/checkout.routes";
import adminProductRoutes from "./routes/admin/admin.product.routes";
import adminOrderRoutes from "./routes/admin/admin.order.routes";
import webhookRoutes from "./routes/webhook.routes";

const app = express();

/* 🔥 STRIPE WEBHOOK — MUST BE FIRST */
app.use(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  webhookRoutes
);

/* ---------- GLOBAL MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- API ROUTES ---------- */
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", checkoutRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

/* ---------- STATIC FILES ---------- */
const rootPath = path.join(__dirname, "..");
app.use(express.static(rootPath));

const adminPath = path.join(rootPath, "admin");
app.use("/admin", express.static(adminPath));

app.get(/^\/admin(\/.*)?$/, (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

export default app;
