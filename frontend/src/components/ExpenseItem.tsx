import { useDispatch } from "react-redux";
import { Expense } from "../types/types";
import { AppDispatch } from "../app/store";
import { deleteExpense } from "../features/expenses/expenseSlice";

function ExpenseItem({ expense }: { expense: Expense }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  return (
    <div className="border-2 bg-slate-50 text-gray-900 p-4 rounded-lg shadow-md mb-2">
      <p className="text-lg font-medium">{expense.text}</p>
      <p>${expense.amount}</p>
      <p className="text-sm text-gray-400">
        {new Date(expense.createdAt).toLocaleString(navigator.language)}
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleDelete}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
