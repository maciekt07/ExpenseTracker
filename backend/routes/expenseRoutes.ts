import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  updateExpense,
} from "../controllers/expenseController";
const router = Router();

// https://youtu.be/-0exw-9YJBo?si=rwElgTQpNo7NROB8&t=1566

router.get("/", getAllExpenses);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

export { router };
