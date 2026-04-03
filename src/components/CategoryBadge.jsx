export default function CategoryBadge({ category }) {
  if (!category) return null;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-white"
      style={{ backgroundColor: category.color || "#64748b" }}
    >
      <span>{category.icon || "🏷️"}</span>
      <span>{category.name}</span>
    </span>
  );
}
