import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

const symbolByCurrency = {
  INR: "Rs",
  USD: "$",
  EUR: "EUR",
  GBP: "GBP",
};

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,
  currency: "INR",
  currencySymbol: symbolByCurrency.INR,
  setSession: async (session) => {
    if (!session?.user) {
      set({ user: null, profile: null, loading: false });
      return;
    }

    set({ user: session.user, loading: true });
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      set({ error: error.message, loading: false });
      return;
    }

    const currency = data.currency || "INR";
    set({
      profile: data,
      currency,
      currencySymbol: symbolByCurrency[currency] || currency,
      loading: false,
      error: null,
    });
  },
  initAuth: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      set({ error: error.message, loading: false });
      return;
    }
    await useAuthStore.getState().setSession(data.session);
  },
  updateProfile: async (updates) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select("*")
      .single();

    if (error) {
      set({ error: error.message });
      return;
    }

    const currency = data.currency || "INR";
    set({
      profile: data,
      currency,
      currencySymbol: symbolByCurrency[currency] || currency,
      error: null,
    });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      profile: null,
      currency: "INR",
      currencySymbol: symbolByCurrency.INR,
    });
  },
}));
