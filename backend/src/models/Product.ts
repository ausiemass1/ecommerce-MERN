// import { Schema, model } from "mongoose";

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

import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
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

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

  export default Product;