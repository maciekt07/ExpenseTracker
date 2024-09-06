import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { createExpense } from "../features/expenses/expenseSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Expense } from "@shared/types/types";

function Add() {
  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [type, setType] = useState<Expense["type"]>("expense");
  const [date, setDate] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const n = useNavigate();

  const { settings } = useSelector((state: RootState) => state.settings);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isoDate = "";
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        isoDate = parsedDate.toISOString();
      } else {
        toast.error("Invalid date");
        return;
      }
    }

    await dispatch(createExpense({ text, amount, type, customDate: isoDate } as Expense));
    toast.success(`Added ${type}: ` + text);
    setText("");
    setAmount(0);
    n("/");
    setDate(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-base-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Expense</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="text" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              placeholder="Enter name"
              onChange={(e) => setText(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder={`Enter amount (${settings.currency})`}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Custom Date
            </label>
            <input
              id="default-datepicker"
              type="date"
              placeholder="Select date"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Type
            </label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as Expense["type"])}
              className="select select-bordered w-full max-w-xs"
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn w-full btn-primary"
            disabled={!text || !amount || !type}
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
