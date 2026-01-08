import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../controllers/admin/admin.product.controller";

import { upload } from "../../middleware/upload";
// import { isAdmin } from "../../middleware/isAdmin";

const router = Router();

router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);

export default router;
