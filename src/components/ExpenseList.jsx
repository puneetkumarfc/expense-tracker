import CategoryBadge from "./CategoryBadge";
import { useAuthStore } from "../store/useAuthStore";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  const currencySymbol = useAuthStore((s) => s.currencySymbol);
  return (
    <div className="overflow-x-auto rounded bg-white shadow">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Note</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-t">
              <td className="p-3">{expense.date}</td>
              <td className="p-3">
                <CategoryBadge category={expense.categories} />
              </td>
              <td className="p-3">{expense.note || "-"}</td>
              <td className="p-3 text-right">
                {currencySymbol} {Number(expense.amount).toFixed(2)}
              </td>
              <td className="p-3 text-right">
                <button onClick={() => onEdit(expense)} className="mr-3 text-blue-600">
                  Edit
                </button>
                <button onClick={() => onDelete(expense.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
