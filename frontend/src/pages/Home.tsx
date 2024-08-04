import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { getExpenses, reset } from "../features/expenses/expenseSlice";

import ExpenseItem from "../components/ExpenseItem";

import Loading from "../components/Loading";
import ThemeSwitcher from "../components/ThemeSwitch";

import { ExpenseDocument } from "../../../shared/types/types";

function Home() {
  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector(
    (state: RootState) => state.expenses
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
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-24">
      <h3 className="text-3xl font-bold">Hello {user && user.name}</h3>
      <p>Welcome to your dashboard</p>
      <ThemeSwitcher />
      <Link to="/add">
        <button className="btn btn-primary btn-md">Add New Expense</button>
      </Link>

      <div>
        {sortedExpenses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedExpenses.map((expense) => (
              <ExpenseItem key={expense._id} expense={expense} />
            ))}
          </div>
        ) : (
          <p>No expenses found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
