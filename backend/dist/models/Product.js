"use strict";
// import { Schema, model } from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface IProduct {
//   name: string;
//   price: number;
//   image: string;
// }
// const productSchema = new Schema<IProduct>({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true }
// });
// export default model<IProduct>("Product", productSchema);
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
    name: String,
    description: String,
    price: Number,
    images: {
        type: [String],
        default: []
    },
    sizes: {
        type: [
            {
                label: String,
                value: String
            }
        ],
        default: []
    }
});
const Product = mongoose_1.default.models.Product || mongoose_1.default.model("Product", productSchema);
exports.default = Product;
