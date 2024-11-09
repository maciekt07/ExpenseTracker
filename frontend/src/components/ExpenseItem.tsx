import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteExpense } from "../features/expenses/expenseSlice";
import { ExpenseDocument } from "@shared/types/types";
import { FaTrashCan } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import UpdateExpenseModal from "./UpdateExpenseModal";

function ExpenseItem({ expense }: { expense: ExpenseDocument }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteExpense(expense._id));
  };

  return (
    <div className="bg-base-300 p-4 rounded-xl mb-2 w-[400px] md:w-[300px] lg:w-[200px] flex flex-col">
      <p className="text-lg font-semibold">{expense.text}</p>
      <p className={`${expense.type === "expense" ? "text-base" : "text-success"}`}>
        {expense.type === "expense" ? "-" : "+"}
        {formatCurrency(expense.amount)}
      </p>
      <div className="flex justify-start">
        <button onClick={() => setIsModalOpen(true)} className="btn btn-info btn-sm mt-2">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-error btn-sm mt-2 ml-2">
          <FaTrashCan size={16} /> Delete
        </button>
      </div>
      <UpdateExpenseModal
        expense={expense}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default ExpenseItem;
