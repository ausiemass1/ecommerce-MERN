import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";

// login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // 🔐 Store refresh token securely (httpOnly cookie)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      accessToken,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, age, email, password } = req.body;

    // 1️ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2️ Save user
    const user = new User({
      name,
      age,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// // login user
// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Check if user exists
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 2. Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 3. Create token
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET!, {
//       expiresIn: "1h",
//     });

  

//     res.json({
//       message: "Login successful",
//       token,
//       role: user.role,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const refreshAccessToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        // { id: decoded.id },
        { id: decoded.id, role: decoded.role },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};
