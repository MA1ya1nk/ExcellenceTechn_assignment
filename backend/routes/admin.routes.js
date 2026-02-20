import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole,
  deleteUserTodo,
  getAdminStats,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/isAdmin.middlewares.js";

const router = Router();

router.get("/stats",          verifyJWT, isAdmin, getAdminStats);
router.get("/users",          verifyJWT, isAdmin, getAllUsers);
router.get("/users/:userId",  verifyJWT, isAdmin, getUserById);
router.delete("/delete-user", verifyJWT, isAdmin, deleteUser);
router.patch("/update-role",  verifyJWT, isAdmin, updateUserRole);
router.delete("/delete-todo", verifyJWT, isAdmin, deleteUserTodo);

export default router;