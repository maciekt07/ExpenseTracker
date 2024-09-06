import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteExpense } from "../features/expenses/expenseSlice";
import { ExpenseDocument } from "@shared/types/types";
import { FaTrashCan } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";

function ExpenseItem({ expense }: { expense: ExpenseDocument }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  // Determine which date to use
  const dateToUse = expense.customDate ? new Date(expense.customDate) : new Date(expense.createdAt);
  const isValidDate = !isNaN(dateToUse.getTime());

  return (
    <div className="bg-base-300 p-4 rounded-xl  mb-2 w-[400px] md:w-[300px] lg:w-[200px] flex flex-col">
      <p className="text-lg font-semibold">{expense.text}</p>
      <p className={`${expense.type === "expense" ? "text-base" : "text-success"}`}>
        {expense.type === "expense" ? "-" : "+"}
        {formatCurrency(expense.amount)}
      </p>
      <p className="text-sm text-gray-400">
        {isValidDate
          ? new Intl.DateTimeFormat(navigator.language, {
              day: "numeric",
              month: "short",
            }).format(dateToUse)
          : "Invalid Date"}
      </p>

      <div className="flex justify-start">
        <button onClick={handleDelete} className="btn btn-error btn-sm mt-2">
          <FaTrashCan size={16} /> Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
