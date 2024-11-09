import { useState } from "react";
import { Expense, ExpenseDocument } from "@shared/types/types";
import { useDispatch } from "react-redux";
import { updateExpense } from "../features/expenses/expenseSlice";
import toast from "react-hot-toast";
import { AppDispatch } from "src/app/store";

interface UpdateExpenseModalProps {
  expense: ExpenseDocument;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateExpenseModal: React.FC<UpdateExpenseModalProps> = ({ expense, isOpen, onClose }) => {
  const [text, setText] = useState(expense.text);
  const [amount, setAmount] = useState(expense.amount);
  const [type, setType] = useState(expense.type);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async () => {
    try {
      await dispatch(updateExpense({ ...expense, text, amount, type }));
      toast.success("Expense updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update expense.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Update Expense {expense.text}</h2>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input input-bordered w-full mt-2"
              placeholder="Expense Name"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input input-bordered w-full mt-2"
              placeholder="Amount"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Expense["type"])}
              className="select select-bordered w-full mt-2"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateExpenseModal;
