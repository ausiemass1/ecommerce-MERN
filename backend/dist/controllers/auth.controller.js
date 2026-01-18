"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt");
// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing credentials" });
        }
        const user = await user_1.default.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
//register user
const registerUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        // 1️ Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // 2️ Save user
        const user = new user_1.default({
            name,
            age,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
};
exports.registerUser = registerUser;
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
const refreshAccessToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        const accessToken = jsonwebtoken_1.default.sign(
        // { id: decoded.id },
        { id: decoded.id, role: decoded.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
        res.json({ accessToken });
    });
};
exports.refreshAccessToken = refreshAccessToken;
