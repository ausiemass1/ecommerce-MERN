import jwt from "jsonwebtoken";
import type { IUser } from "../models/user";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (user: IUser) =>
  jwt.sign(
    { id: user._id.toString(), role: user.role },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

export const generateRefreshToken = (user: IUser) =>
  jwt.sign(
    // { id: user._id },
    { id: user._id.toString(), role: user.role },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
