import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyBarChart({ data }) {
  return (
    <div className="h-72 rounded bg-white p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#0f172a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
