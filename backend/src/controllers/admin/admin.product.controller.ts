// import { Request, Response } from "express";
import { Request, Response } from "express";
import Product from "../../models/Product";


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      productId: id,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ message: "Failed to delete product" });
  }
};

// update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;

    if (req.file) {
      const file = req.file as Express.Multer.File & { location?: string };
      product.images = [file.location!];
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Update failed" });
  }
}

//add product


export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, sizes } = req.body;

    const imageUrl = req.file
      ? (req.file as any).location
      : null;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      sizes: sizes ? JSON.parse(sizes) : [],
      images: imageUrl ? [imageUrl] : [],
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
}