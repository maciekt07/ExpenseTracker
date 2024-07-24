import { useDispatch } from "react-redux";
import { Expense } from "../types/types";
import { AppDispatch } from "../app/store";
import { deleteExpense } from "../features/expenses/expenseSlice";

function ExpenseItem({ expense }: { expense: Expense }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  const createdAtDate = new Date(expense.createdAt);
  const isValidDate = !isNaN(createdAtDate.getTime());

  return (
    <div className=" bg-gray-700 text-gray-100 p-4 rounded-xl shadow-md mb-2 w-[400px] md:w-[300px] lg:w-[200px]">
      <p className="text-lg font-semibold">{expense.text}</p>
      <p
        className={`${
          expense.type === "expense" ? "text-red-500" : "text-green-500"
        }`}
      >
        {expense.type === "expense" ? "-" : "+"}${expense.amount}
      </p>
      <p className="text-sm text-gray-400">
        {isValidDate
          ? new Intl.DateTimeFormat(navigator.language, {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }).format(createdAtDate)
          : "Invalid Date"}
      </p>
      <div className="flex justify-start">
        <button
          onClick={handleDelete}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
