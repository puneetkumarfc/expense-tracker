import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";
import { supabase } from "./lib/supabaseClient";

function ProtectedLayout() {
  return (
    <div className="min-h-screen md:flex">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
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
