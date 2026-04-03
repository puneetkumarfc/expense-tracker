import { useAuthStore } from "../store/useAuthStore";

export default function BudgetCard({ title, spent, limit }) {
  const currencySymbol = useAuthStore((s) => s.currencySymbol);
  const progress = Math.min((spent / limit) * 100, 100);
  const overBudget = spent > limit;

  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className={overBudget ? "text-red-600" : "text-slate-700"}>
          {currencySymbol} {spent.toFixed(2)} / {currencySymbol} {Number(limit).toFixed(2)}
        </span>
      </div>
      <div className="h-2 rounded bg-slate-200">
        <div
          className={`h-2 rounded ${overBudget ? "bg-red-500" : "bg-emerald-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
