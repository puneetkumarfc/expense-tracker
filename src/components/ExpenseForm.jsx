import { useState } from "react";

export default function ExpenseForm({ categories, onSubmit, initial }) {
  const [form, setForm] = useState(
    initial || {
      amount: "",
      category_id: "",
      date: new Date().toISOString().slice(0, 10),
      note: "",
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm({ ...form, amount: "", note: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4">
      <input
        type="number"
        required
        step="0.01"
        placeholder="Amount"
        className="rounded border p-2"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <select
        required
        className="rounded border p-2"
        value={form.category_id}
        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
      >
        <option value="">Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="rounded border p-2"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Note"
        className="rounded border p-2"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      <button className="rounded bg-slate-900 px-3 py-2 text-white md:col-span-4">
        {initial ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}
