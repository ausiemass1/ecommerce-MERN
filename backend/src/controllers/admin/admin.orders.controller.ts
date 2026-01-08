import { Request, Response } from "express";
import Order from "../../models/ordersModel";
import { paginate } from "../../utils/paginate";

// view all orders
// export const getAllOrders = async (req: Request, res: Response) => {
//   const page = Number(req.query.page) || 1;
//   const limit = 10;

//   const orders = await Order.find()
//     .sort({ createdAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);

//   const total = await Order.countDocuments();

//   res.json({
//     orders,
//     total,
//     page,
//     pages: Math.ceil(total / limit),
//   });
// };

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
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const totalItems = await Order.countDocuments();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      data: orders,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

