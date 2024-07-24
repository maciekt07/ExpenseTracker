import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createExpense } from "../features/expenses/expenseSlice";
import { Expense } from "../types/types";
import { useNavigate } from "react-router-dom";

function Add() {
  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [type, setType] = useState<Expense["type"]>("expense");

  const dispatch = useDispatch<AppDispatch>();
  const n = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createExpense({ text, amount, type } as Expense));
    setText("");
    setAmount(0);
    n("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 text-white">
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New Expense
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              placeholder="Enter name"
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as Expense["type"])}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full font-semibold bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
