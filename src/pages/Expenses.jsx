import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useExpenseStore } from "../store/useExpenseStore";

export default function Expenses() {
  const {
    expenses,
    categories,
    fetchExpenses,
    fetchCategories,
    addExpense,
    updateExpense,
    deleteExpense,
    loading,
    error,
  } = useExpenseStore();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchExpenses({ month: selectedMonth, categoryId: selectedCategory });
  }, [fetchExpenses, selectedMonth, selectedCategory]);

  return (
    <div className="space-y-4">
      <ExpenseForm
        categories={categories}
        initial={editing}
        onSubmit={(payload) => {
          if (editing) {
            updateExpense(editing.id, payload);
            setEditing(null);
          } else {
            addExpense(payload);
          }
        }}
      />
      <div className="flex flex-col gap-2 md:flex-row">
        <input type="month" className="rounded border p-2" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
        <select className="rounded border p-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      {loading && <p>Loading expenses...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <ExpenseList expenses={expenses} onEdit={setEditing} onDelete={deleteExpense} />
    </div>
  );
}
