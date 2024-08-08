import { ExpenseDocument } from "../../../shared/types/types";
import { formatCurrency } from "../utils/currencyFormatter";

interface WeeklyChartProps {
  expenses: ExpenseDocument[];
}

export default function WeeklyChart({ expenses }: WeeklyChartProps) {
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.customDate || a.createdAt);
    const dateB = new Date(b.customDate || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = sortedExpenses
    .filter((expense) => {
      const expenseDate = new Date(expense.customDate || expense.createdAt);
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        expense.type === "expense"
      );
    })
    .reduce((total, expense) => total + (expense.amount || 0), 0);

  const dailyExpenses = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - ((date.getDay() + 6 - i) % 7));
    const dayExpenses = sortedExpenses.filter((expense) => {
      const expenseDate = new Date(expense.customDate || expense.createdAt);
      return (
        expenseDate.getDate() === date.getDate() &&
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear &&
        expense.type === "expense"
      );
    });
    return dayExpenses.reduce(
      (total, expense) => total + (expense.amount || 0),
      0
    );
  });

  const locale = navigator.language;
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - ((date.getDay() + 6 - i) % 7));
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  });

  const maxDataValue = Math.max(...dailyExpenses);

  return (
    <div className="bg-base-200 rounded-lg">
      <div className="w-96 mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Spending - Last 7 days</h2>
        <div className="relative h-48 bg-base-200 rounded-lg">
          {dailyExpenses.map((value, index) => (
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
              <div className="text-center text-xs mt-1">
                {daysOfWeek[index]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-2">
          <hr className="border-base-100 w-full" />
          <div className="flex-col mt-3">
            <p className="text-sm">Total this month</p>
            <p className="text-3xl font-semibold">
              {formatCurrency(monthlyExpenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
