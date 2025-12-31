import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  image: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

export default model<IProduct>("Product", productSchema);
