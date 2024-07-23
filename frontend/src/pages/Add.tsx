import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/strore";
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
    <div>
      <h2>Add</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="text" />
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Add;
