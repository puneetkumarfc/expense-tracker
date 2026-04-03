import { useEffect, useMemo } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import { useAuthStore } from "../store/useAuthStore";
import SpendingPieChart from "../components/Charts/SpendingPieChart";
import CategoryBadge from "../components/CategoryBadge";

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

  const topCategories = [...byCategory].sort((a, b) => b.value - a.value).slice(0, 3);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid gap-4">
      <div className="rounded bg-white p-4 shadow">
        <p className="text-sm text-slate-500">Total spent this month</p>
        <h2 className="text-2xl font-bold">{currencySymbol} {totalSpent.toFixed(2)}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SpendingPieChart data={byCategory} />
        <div className="rounded bg-white p-4 shadow">
          <h3 className="mb-3 font-semibold">Top Categories</h3>
          <div className="space-y-2">
            {topCategories.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <CategoryBadge category={c} />
                <span>{currencySymbol} {c.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded bg-white p-4 shadow">
        <h3 className="mb-3 font-semibold">Recent Expenses</h3>
        <div className="space-y-2">
          {expenses.slice(0, 5).map((e) => (
            <div key={e.id} className="flex justify-between border-b pb-2 text-sm">
              <span>{e.date} - {e.note || e.categories?.name}</span>
              <span>{currencySymbol} {Number(e.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
