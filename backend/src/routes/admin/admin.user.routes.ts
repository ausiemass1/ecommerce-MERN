import { Router } from "express";
import { getAllUsers } from "../../controllers/admin/admin.user.controller";

const router = Router();

router.get("/", getAllUsers);

export default router;