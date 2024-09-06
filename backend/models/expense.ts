import mongoose from "mongoose";
import type { Expense } from "@shared/types/types";

const expenseSchema = new mongoose.Schema<Expense>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Expense text is required"],
    },
    customDate: {
      type: String,
    },
    type: {
      type: String,
      required: [true, "Expense type is required"],
      enum: ["income", "expense"],
      default: "expense",
    },
    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      default: 0,
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
