import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
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
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
