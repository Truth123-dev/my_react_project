import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController";

const router = Router();

router.use(authMiddleware);
router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
