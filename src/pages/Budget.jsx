import { useEffect, useMemo, useState } from "react";
import BudgetCard from "../components/BudgetCard";
import { useExpenseStore } from "../store/useExpenseStore";

export default function Budget() {
  const { categories, expenses, budgets, fetchCategories, fetchExpenses, fetchBudgets, upsertBudget } = useExpenseStore();
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchExpenses({ month });
    fetchBudgets(month);
  }, [fetchCategories, fetchExpenses, fetchBudgets, month]);

  const spentByCategory = useMemo(
    () =>
      expenses.reduce((acc, item) => {
        acc[item.category_id] = (acc[item.category_id] || 0) + Number(item.amount);
        return acc;
      }, {}),
    [expenses],
  );

  return (
    <div className="space-y-4">
      <form
        className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault();
          upsertBudget({ category_id: categoryId, amount: Number(amount), month });
          setAmount("");
        }}
      >
        <input type="month" className="rounded border p-2" value={month} onChange={(e) => setMonth(e.target.value)} />
        <select required className="rounded border p-2" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input required type="number" step="0.01" className="rounded border p-2" placeholder="Budget amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="rounded bg-slate-900 p-2 text-white">Set Budget</button>
      </form>
      <div className="grid gap-3">
        {budgets.map((b) => (
          <BudgetCard
            key={b.id}
            title={b.categories?.name || "Category"}
            spent={spentByCategory[b.category_id] || 0}
            limit={Number(b.amount)}
          />
        ))}
      </div>
    </div>
  );
}
