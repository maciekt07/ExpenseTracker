import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createExpense } from "../features/expenses/expenseSlice";
import { Expense } from "../types/types";
import { useNavigate } from "react-router-dom";

function Add() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const n = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createExpense({ text, amount } as Expense));
    setText("");
    setAmount(0);
    n("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          Add New Expense
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
