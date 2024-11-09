import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import ExpenseItem from "../components/ExpenseItem";
import Loading from "../components/Loading";
import { ExpenseDocument } from "@shared/types/types";
import { FaPlus, FaWallet } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import WeeklyChart from "../components/WeeklyChart";

function Home() {
  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector(
    (state: RootState) => state.expenses,
  );

  useEffect(() => {
    if (!user) {
      n("/login");
    }
    dispatch(getExpenses({} as ExpenseDocument));
    return () => {
      dispatch(reset());
    };
  }, [user, n, isError, dispatch, message]);

  if (isLoading) {
    return <Loading />;
  }

  const sortedExpenses = [...(expenses as ExpenseDocument[])].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  // Calculate total income for all time
  const totalIncome = (expenses as ExpenseDocument[])
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // Calculate total expenses for all time
  const totalExpenses = (expenses as ExpenseDocument[])
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  // Calculate actual balance
  const actualBalance = totalIncome - totalExpenses;

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-24">
      <h3 className="text-3xl font-bold">Hello, {user && user.name} 👋</h3>

      <div
        className={`flex items-center justify-between gap-8 w-96 h-24 p-4 rounded-xl shadow-lg ${
          actualBalance >= 0 ? "bg-primary" : "bg-error"
        } text-primary-content`}
      >
        <div>
          <p>My Balance</p>
          <p className="text-2xl font-semibold">{formatCurrency(actualBalance)}</p>
        </div>
        <div>
          <FaWallet className="text-3xl" />
        </div>
      </div>

      <WeeklyChart expenses={expenses as ExpenseDocument[]} />

      <div>
        <p className="mb-2 ml-2">Recent Transactions</p>
        {sortedExpenses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedExpenses.map((expense) => (
              <ExpenseItem key={expense._id} expense={expense} />
            ))}
          </div>
        ) : (
          <p className="text-center">No expenses found</p>
        )}
      </div>
      <Link to="/add">
        <button
          className="fixed bottom-5 right-5 btn btn-circle btn-primary btn-lg tooltip tooltip-left"
          data-tip="Add New Expense"
        >
          <div className="flex items-center justify-center w-full h-full">
            <FaPlus />
          </div>
        </button>
      </Link>
    </div>
  );
}

export default Home;
