import { Router } from "express";
import { getAllUsers } from "../../controllers/admin/admin.user.controller";
import { deleteUser } from "../../controllers/admin/admin.user.controller";
import { updateUser } from "../../controllers/admin/admin.user.controller";

const router = Router();

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;