import { Router } from "express";
import { getAllOrders, getOrderById } from "../../controllers/admin/admin.orders.controller";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById); 

export default router;
