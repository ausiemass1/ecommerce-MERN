import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../../models/ordersModel";
import { paginate } from "../../utils/paginate";

//view single order
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// fetch all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      orderId,
      email,
      status,
      startDate,
      endDate,
    } = req.query;

    const query: any = {};

    // 🔍 Order ID search
    if (orderId && mongoose.Types.ObjectId.isValid(orderId as string)) {
      query._id = orderId;
    }

    // 📧 Customer email search
    if (email) {
      query.customerEmail = { $regex: email, $options: "i" };
    }

    // 📦 Status filter
    if (status) {
      query.payment_status = status;
    }

    // 📅 Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate as string);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate as string);
      }
    }

    const result = await paginate(Order, {
      page: Number(page),
      limit: Number(limit),
      sort: { createdAt: -1 },
      filter: query,
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Fetch orders failed:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
