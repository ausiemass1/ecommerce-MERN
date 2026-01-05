import  { Router } from "express";
import { deleteProduct } from "../../controllers/admin/product.controller";
import { auth } from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import Product from "../../models/Product";
import { Request } from "express";
// import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

// CREATE a new product
router.post(
    "/",
    upload.single("image"),
    async (req, res) => {
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
  );

  //UPDATE a product
 
router.put("/:id", upload.single("image"), async (req: Request, res) => {
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
});
  

// DELETE /api/admin/products/:id
router.delete("/:id", deleteProduct);

export default router;
