import { Router } from "express";
import { getAllOrders } from "../../controllers/admin/admin.orders.controller";

const router = Router();

router.get("/", getAllOrders);

export default router;
