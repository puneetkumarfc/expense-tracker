import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) return setError(authError.message);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-xl"
      >
        <h2 className="mb-4 text-xl font-semibold text-white">Login</h2>
        <input
          className="mb-3 w-full rounded-lg border border-white/30 bg-white/40 p-2 text-slate-900 placeholder:text-slate-600"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-3 w-full rounded-lg border border-white/30 bg-white/40 p-2 text-slate-900 placeholder:text-slate-600"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-lg bg-slate-900/90 p-2 text-white transition hover:bg-slate-900"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="mt-3 text-sm text-slate-100">
          No account?{" "}
          <Link to="/signup" className="font-medium text-cyan-200 hover:text-cyan-100">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
