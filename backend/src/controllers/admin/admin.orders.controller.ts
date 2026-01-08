import { Request, Response } from "express";
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

// view all orders (paginated)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await paginate(Order, {
      page,
      limit,
      sort: { createdAt: -1 },
    });

    res.json(result);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};