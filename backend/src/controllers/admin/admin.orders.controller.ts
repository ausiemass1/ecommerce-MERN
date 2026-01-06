import { Request, Response } from "express";

import Order from "../../models/ordersModel";

// controllers/adminOrdersController.ts
export const getAllOrders = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = 10;
  
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  
    const total = await Order.countDocuments();
  
    res.json({
      orders,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  };

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
