import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { getExpenses, reset } from "../features/expenses/expenseSlice";
import { Expense } from "../types/types";
import ExpenseItem from "../components/ExpenseItem";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

function Home() {
  const n = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { expenses, isLoading, isError, message } = useSelector(
    (state: RootState) => state.expenses
  );
  useEffect(() => {
    if (isError) {
      if (message !== "Unauthorized") {
        toast.error(message);
      }
    }

    if (!user) {
      n("/login");
    }

    dispatch(getExpenses({} as Expense));

    return () => {
      dispatch(reset());
    };
  }, [user, n, isError, dispatch, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-24">
      <h3 className="text-3xl font-bold">Hello {user && user.name}</h3>
      <p>Welcome to your dashboard</p>

      <Link to="/add">
        <button className="btn btn-primary btn-md">Add New Expense</button>
      </Link>

      <div>
        {expenses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {expenses.map((expense) => (
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
