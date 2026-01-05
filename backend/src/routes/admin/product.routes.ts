import  { Router } from "express";
import { deleteProduct } from "../../controllers/admin/product.controller";
import { auth } from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import Product from "../../models/Product";
// import { isAdmin } from "../../middleware/isAdmin";

const router = Router();


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

// DELETE /api/admin/products/:id
router.delete("/:id", deleteProduct);

export default router;
