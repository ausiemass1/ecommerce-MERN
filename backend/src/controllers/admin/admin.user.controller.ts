import { Request, Response } from "express";
import User from "../../models/user";
import { paginate } from "../../utils/paginate";

// LIST ALL USERS
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

//ADD USER
export const addUser = async (req: Request, res: Response) => {
    try {
      const { name, email, role } = req.body;
      const user = new User({ name, email, role });
      await user.save();
      res.status(201).json({ message: "User added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add user" });
    }
  };

//EDIT USER
export const updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name;
      user.email = email;
      user.role = role;
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  };

//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "User deleted successfully",
        userId: id,
      });
    } catch (error) {
      console.error("Delete user error:", error);
      return res.status(500).json({ message: "Failed to delete user" });
    }
  };