import { Request, Response } from "express";
import User from "../../models/user";
export const getAllUsers = (req: Request, res: Response) => {
    try {
      const users = User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
};