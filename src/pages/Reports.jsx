import { useEffect, useMemo, useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";
import MonthlyBarChart from "../components/Charts/MonthlyBarChart";
import SpendingPieChart from "../components/Charts/SpendingPieChart";

export default function Reports() {
  const { expenses, fetchExpenses } = useExpenseStore();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const monthlyData = useMemo(() => {
    const map = {};
    expenses.forEach((item) => {
      const key = item.date.slice(0, 7);
      map[key] = (map[key] || 0) + Number(item.amount);
    });
    return Object.entries(map)
      .sort((a, b) => (a[0] < b[0] ? -1 : 1))
      .slice(-6)
      .map(([m, total]) => ({ month: m, total: Number(total.toFixed(2)) }));
  }, [expenses]);

  const pieData = useMemo(() => {
    const scoped = expenses.filter((e) => e.date.startsWith(month));
    const map = {};
    scoped.forEach((item) => {
      const name = item.categories?.name || "Other";
      if (!map[name]) map[name] = { name, value: 0, color: item.categories?.color || "#334155" };
      map[name].value += Number(item.amount);
    });
    return Object.values(map);
  }, [expenses, month]);

  const exportCsv = () => {
    const rows = expenses.filter((e) => e.date.startsWith(month));
    const csv = [
      "date,category,amount,note",
      ...rows.map((r) => `${r.date},"${r.categories?.name || ""}",${r.amount},"${(r.note || "").replaceAll('"', '""')}"`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses-${month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="month" className="rounded border p-2" value={month} onChange={(e) => setMonth(e.target.value)} />
        <button onClick={exportCsv} className="rounded bg-slate-900 px-3 py-2 text-sm text-white">Export CSV</button>
      </div>
      <MonthlyBarChart data={monthlyData} />
      <SpendingPieChart data={pieData} />
    </div>
  );
}
