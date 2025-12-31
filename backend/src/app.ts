import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

export default app;
