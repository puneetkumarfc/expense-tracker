import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import { useAuthStore } from "./store/useAuthStore";
import { supabase } from "./lib/supabaseClient";

const titleByPath = {
  "/dashboard": "Dashboard",
  "/expenses": "Expenses",
  "/categories": "Categories",
  "/budget": "Budget",
  "/reports": "Reports",
  "/settings": "Settings",
};

function ProtectedLayout() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const pageTitle = titleByPath[location.pathname] || "Dashboard";
  const userSeed = profile?.full_name || user?.email || "U";
  const initial = userSeed.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="ml-20 p-6 transition-all duration-300 peer-hover:ml-56">
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">{pageTitle}</h1>
          <div className="flex items-center gap-3">
            <input
              placeholder="Search"
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700">
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 01-5.714 0M18 8a6 6 0 10-12 0c0 4-2 5-2 5h16s-2-1-2-5M13.73 21a2 2 0 01-3.46 0"
                />
              </svg>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
              {initial}
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const initAuth = useAuthStore((s) => s.initAuth);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    initAuth();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => data.subscription.unsubscribe();
  }, [initAuth, setSession]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
