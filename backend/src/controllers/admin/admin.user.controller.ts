import { Request, Response } from "express";
import User from "../../models/user";
import { paginate } from "../../utils/paginate";
export const getAllUsers = async (req: Request, res: Response) => {
    try {
     const page = Number(req.query.page) || 1;
     const limit = Number(req.query.limit) || 10;
      const result = await paginate(User, {
        page,
        limit,
        sort: { createdAt: -1 },
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
};