import { Response, Request } from "express";
import redis from "../config/redis";
import {  AuthRequest } from "../middleware/auth";
import Product from "../models/Product";
export const  addToCart =async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { productId } = req.params;
  
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    const key = `cart:${userId}`;
  
    const cartData = await redis.get<any>(key);
  
    const cart = cartData ?? {
      items: [],
      totalQuantity: 0,
      totalPrice: 0
    };
  
    const existingItem = cart.items.find(
      (item: any) => item.productId === productId
    );
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  
    cart.totalQuantity += 1;
    cart.totalPrice += product.price;
  
    await redis.set(
      key,
      JSON.stringify(cart),
      { ex: 60 } // 1 minute (testing)
    );
    
    
  
  
    res.json(cart);
  }