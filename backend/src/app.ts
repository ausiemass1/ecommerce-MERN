// import dotenv from "dotenv";
// dotenv.config(); 

import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth"
import cartRoutes from "./routes/cart";
import checkoutRoutes from "./routes/checkout.routes";




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", checkoutRoutes);

export default app;
