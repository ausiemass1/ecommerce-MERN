import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import {registerUser, loginUser }from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
