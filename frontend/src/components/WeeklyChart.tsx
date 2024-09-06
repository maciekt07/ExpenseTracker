import { ExpenseDocument } from "@shared/types/types";
import { formatCurrency } from "../utils/currencyFormatter";

interface WeeklyChartProps {
  expenses: ExpenseDocument[];
}

export default function WeeklyChart({ expenses }: WeeklyChartProps) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Assuming week starts on Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const weeklyExpenses = sortedExpenses.filter((expense) => {
    const expenseDate = new Date(expense.customDate || expense.createdAt);
    return expenseDate >= startOfWeek && expenseDate <= endOfWeek && expense.type === "expense";
  });

  const dailyExpenses = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayExpenses = weeklyExpenses.filter((expense) => {
      const expenseDate = new Date(expense.customDate || expense.createdAt);
      return (
        expenseDate.getDate() === date.getDate() &&
        expenseDate.getMonth() === date.getMonth() &&
        expenseDate.getFullYear() === date.getFullYear()
      );
    });
    return dayExpenses.reduce((total, expense) => total + (expense.amount || 0), 0);
  });

  const locale = navigator.language;
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  });

  const maxDataValue = Math.max(...dailyExpenses, 0);

  const monthlyExpenses = weeklyExpenses.reduce(
    (total, expense) => total + (expense.amount || 0),
    0,
  );

  return (
    <div className="bg-base-200 rounded-lg">
      <div className="w-96 mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Spending - This Week</h2>
        <div className="relative h-48 bg-base-200 rounded-lg">
          {dailyExpenses.reduce((acc, value) => acc + value, 0) > 0 ? (
            dailyExpenses.map((value, index) => (
              <div
                key={index}
                className="absolute bottom-0"
                style={{
                  left: `${(index * 100) / 7}%`,
                  width: `${100 / 7}%`,
                  height: `${(value / maxDataValue) * 100}%`,
                  padding: "0.5rem",
                }}
              >
                <div className="text-center text-xs mt-1">{value.toFixed(0)}</div>
                <div className="bg-secondary h-full w-full rounded-md"></div>
                <div className="text-center text-xs mt-1">{daysOfWeek[index]}</div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-48 text-lg">
              No expenses this week
            </div>
          )}
        </div>

        <div className="mt-10 p-2">
          <hr className="border-base-100 w-full" />
          <div className="flex-col mt-3">
            <p className="text-sm">Total this week</p>
            <p className="text-3xl font-semibold">{formatCurrency(monthlyExpenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
