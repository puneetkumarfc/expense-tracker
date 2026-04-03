import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function SpendingPieChart({ data }) {
  return (
    <div className="h-64 rounded bg-white p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.color || "#334155"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
