import { useDispatch } from "react-redux";
import { Expense } from "../types/types";
import { AppDispatch } from "../app/strore";
import { deleteExpense } from "../features/expenses/expenseSlice";

function ExpenseItem({ expense }: { expense: Expense }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  return (
    <div style={{ border: "2px solid red", padding: "10px" }}>
      <p>{expense.text}</p>
      <p>{expense.amount}</p>
      <p>{new Date(expense.createdAt).toLocaleString(navigator.language)}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ExpenseItem;
