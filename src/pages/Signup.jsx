import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setLoading(false);
      return setError(signUpError.message);
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
      });
    }

    setLoading(false);
    toast.success("Verification email sent. Please check your inbox.");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-xl"
      >
        <h2 className="mb-4 text-xl font-semibold text-white">Sign up</h2>
        <input
          className="mb-3 w-full rounded-lg border border-white/30 bg-white/40 p-2 text-slate-900 placeholder:text-slate-600"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          {loading ? "Creating..." : "Create account"}
        </button>
        <p className="mt-3 text-sm text-slate-100">
          Have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-200 hover:text-cyan-100">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
