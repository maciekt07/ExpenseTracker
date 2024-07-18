import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Expense text is required"],
    },
    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
