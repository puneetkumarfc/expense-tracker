import { useEffect, useState } from "react";
import CategoryBadge from "../components/CategoryBadge";
import { useExpenseStore } from "../store/useExpenseStore";

export default function Categories() {
  const { categories, fetchCategories, addCategory, deleteCategory, loading, error } = useExpenseStore();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0f172a");
  const [icon, setIcon] = useState("🏷️");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="space-y-4">
      <form
        className="grid gap-3 rounded bg-white p-4 shadow md:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault();
          addCategory({ name, color, icon });
          setName("");
        }}
      >
        <input required className="rounded border p-2" placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="color" className="h-10 rounded border p-1" value={color} onChange={(e) => setColor(e.target.value)} />
        <input className="rounded border p-2" placeholder="Emoji" value={icon} onChange={(e) => setIcon(e.target.value)} />
        <button className="rounded bg-slate-900 p-2 text-white">Add Category</button>
      </form>
      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-2 rounded bg-white p-4 shadow">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between">
            <CategoryBadge category={category} />
            <button onClick={() => deleteCategory(category.id)} className="text-sm text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
