import { Request, Response } from "express";
import Product from "../models/Product";

//get all products
export const getProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};
