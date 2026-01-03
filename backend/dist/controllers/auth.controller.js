"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const registerUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        // 1️⃣ Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // 2️⃣ Save user
        const user = new user_1.default({
            name,
            age,
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
};
exports.registerUser = registerUser;
// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. Check if user exists
        const user = await user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // 2. Compare passwords
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // 3. Create token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            message: "Login successful",
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.loginUser = loginUser;
