import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const links = [
  ["Dashboard", "/"],
  ["Expenses", "/expenses"],
  ["Categories", "/categories"],
  ["Budget", "/budget"],
  ["Reports", "/reports"],
  ["Settings", "/settings"],
];

export default function Navbar() {
  const logout = useAuthStore((s) => s.logout);
  return (
    <aside className="w-full bg-white p-4 shadow md:min-h-screen md:w-56">
      <h1 className="mb-5 text-lg font-semibold">Expense Tracker</h1>
      <nav className="flex flex-col gap-2">
        {links.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded px-3 py-2 text-sm ${isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={logout}
        className="mt-6 w-full rounded bg-red-500 px-3 py-2 text-sm text-white"
      >
        Logout
      </button>
    </aside>
  );
}
