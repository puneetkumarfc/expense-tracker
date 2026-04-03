import { useEffect, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useExpenseStore } from "../store/useExpenseStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Dashboard() {
  const { expenses, fetchExpenses, loading, error } = useExpenseStore();
  const currencySymbol = useAuthStore((s) => s.currencySymbol);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date?.startsWith(currentMonth)),
    [expenses, currentMonth],
  );
  const totalSpent = monthExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);
  const lastMonthTotal = expenses
    .filter((e) => e.date?.startsWith(lastMonth))
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const trendPercent = lastMonthTotal ? ((totalSpent - lastMonthTotal) / lastMonthTotal) * 100 : 0;
  const budgetBase = Math.max(totalSpent * 1.35, 1);
  const budgetRemaining = Math.max(budgetBase - totalSpent, 0);
  const budgetRemainingPercent = Math.round((budgetRemaining / budgetBase) * 100);

  const byCategory = Object.values(
    monthExpenses.reduce((acc, e) => {
      const key = e.categories?.name || "Other";
      if (!acc[key]) {
        acc[key] = { name: key, value: 0, color: e.categories?.color || "#334155", icon: e.categories?.icon || "🏷️" };
      }
      acc[key].value += Number(e.amount);
      return acc;
    }, {}),
  );
  const sortedCategories = [...byCategory].sort((a, b) => b.value - a.value);
  const topCategory = sortedCategories[0];
  const biggestExpense = monthExpenses[0];
  const transactionsCount = monthExpenses.length;
  const chartSeries = monthExpenses
    .slice(0, 8)
    .reverse()
    .map((item, idx) => ({
      day: `D${idx + 1}`,
      amount: Number(item.amount),
    }));

  const pieData = sortedCategories.slice(0, 5).map((item, idx) => ({
    ...item,
    color: ["#FACC15", "#fde68a", "#fef3c7", "#f59e0b", "#fbbf24"][idx % 5],
  }));

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md xl:col-span-2">
          <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Total spent this month</p>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-4xl font-bold text-gray-900">
              {currencySymbol} {totalSpent.toFixed(2)}
            </h2>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              ↑ {Math.abs(trendPercent).toFixed(1)}%
            </span>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartSeries}>
                <defs>
                  <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FACC15" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FACC15" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#FACC15" strokeWidth={3} fill="url(#spendFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-sm transition-shadow duration-200 hover:shadow-md">
          <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Budget remaining</p>
          <p className="text-5xl font-bold text-yellow-400">{budgetRemainingPercent}%</p>
          <p className="mt-2 text-sm text-gray-400">
            {currencySymbol} {budgetRemaining.toFixed(2)} remaining this month
          </p>
          <button className="mt-8 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900">
            View Budget
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Top category this month</p>
          <h3 className="text-2xl font-bold text-gray-900">{topCategory?.name || "No data"}</h3>
          <p className="mb-3 text-sm text-gray-500">
            {currencySymbol} {Number(topCategory?.value || 0).toFixed(2)}
          </p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedCategories.slice(0, 4)}>
                <Tooltip />
                <Bar dataKey="value" fill="#FACC15" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Spending breakdown</p>
          <div className="relative mx-auto mt-2 h-36 w-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={40} outerRadius={68} dataKey="value">
                  {pieData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-sm font-bold text-gray-900">{currencySymbol}{totalSpent.toFixed(0)}</p>
              </div>
            </div>
          </div>
          <button className="mx-auto mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-gray-900">
            +
          </button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Transactions this month</p>
            <p className="text-3xl font-bold text-gray-900">{transactionsCount}</p>
          </div>
          <div className="rounded-3xl bg-yellow-400 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <p className="mb-1 text-xs uppercase tracking-wide text-yellow-900/70">Biggest expense</p>
            <p className="text-xl font-bold text-gray-900">{biggestExpense?.categories?.name || "No data"}</p>
            <p className="text-sm text-yellow-900/80">
              {currencySymbol} {Number(biggestExpense?.amount || 0).toFixed(2)}
            </p>
            <div className="mt-3 h-2 rounded-full bg-yellow-200">
              <div className="h-2 w-2/3 rounded-full bg-yellow-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Recent Expenses</h3>
          <span className="text-sm font-medium text-yellow-500">View all →</span>
        </div>
        <div className="space-y-2">
          {monthExpenses.slice(0, 5).map((e) => (
            <div key={e.id} className="flex items-center justify-between border-b border-gray-50 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-500">{e.date}</span>
                <p className="truncate text-sm font-medium text-gray-800">{e.note || "Expense"}</p>
                <span className="rounded-full bg-yellow-50 px-2 py-1 text-xs text-yellow-700">
                  {e.categories?.name || "Other"}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {currencySymbol} {Number(e.amount).toFixed(2)}
              </p>
            </div>
          ))}
          {monthExpenses.length === 0 && <p className="text-sm text-gray-500">No expenses this month yet.</p>}
        </div>
      </div>
    </div>
  );
}
