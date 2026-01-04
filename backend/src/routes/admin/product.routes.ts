import  { Router } from "express";
import { deleteProduct } from "../../controllers/admin/product.controller";
import { auth } from "../../middleware/auth";
// import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

// DELETE /api/admin/products/:id
router.delete("/:id", deleteProduct);

export default router;
