import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Settings() {
  const profile = useAuthStore((s) => s.profile);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [currency, setCurrency] = useState(profile?.currency || "INR");

  useEffect(() => {
    setFullName(profile?.full_name || "");
    setCurrency(profile?.currency || "INR");
  }, [profile]);

  return (
    <form
      className="max-w-lg space-y-3 rounded bg-white p-4 shadow"
      onSubmit={(e) => {
        e.preventDefault();
        updateProfile({ full_name: fullName, currency });
      }}
    >
      <h2 className="text-lg font-semibold">Settings</h2>
      <input className="w-full rounded border p-2" placeholder="Display name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <select className="w-full rounded border p-2" value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button className="rounded bg-slate-900 px-3 py-2 text-white">Save</button>
    </form>
  );
}
