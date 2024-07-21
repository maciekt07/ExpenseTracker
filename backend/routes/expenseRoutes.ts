import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "../controllers/expenseController";
import protect from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createExpense);

router.get("/", protect, getAllExpenses);

router.put("/:id", protect, updateExpense);

router.delete("/:id", protect, deleteExpense);

export { router as ExpenseRouter };
