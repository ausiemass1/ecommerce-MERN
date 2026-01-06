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
