"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define user schema
const userSchema = new mongoose_1.default.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    googleId: String,
    githubId: String,
    // Add role field
    role: {
        type: String,
        enum: ["user", "admin"], // allowed roles
        default: "user", // default role when registering
    },
});
// Prevent model overwrite if it’s already compiled
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
