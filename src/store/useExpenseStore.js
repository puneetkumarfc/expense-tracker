import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "./useAuthStore";

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  categories: [],
  budgets: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    set({ loading: true });
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) return set({ error: error.message, loading: false });
    set({ categories: data || [], loading: false, error: null });
  },
  fetchExpenses: async ({ month, categoryId } = {}) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    set({ loading: true });
    let query = supabase
      .from("expenses")
      .select("*, categories(id,name,color,icon)")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    if (month) query = query.like("date", `${month}%`);
    if (categoryId) query = query.eq("category_id", categoryId);
    const { data, error } = await query;
    if (error) return set({ error: error.message, loading: false });
    set({ expenses: data || [], loading: false, error: null });
  },
  fetchBudgets: async (month) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    set({ loading: true });
    let query = supabase
      .from("budgets")
      .select("*, categories(id,name,color,icon)")
      .eq("user_id", userId);
    if (month) query = query.eq("month", month);
    const { data, error } = await query;
    if (error) return set({ error: error.message, loading: false });
    set({ budgets: data || [], loading: false, error: null });
  },
  addExpense: async (payload) => {
    const userId = useAuthStore.getState().user?.id;
    const { error } = await supabase.from("expenses").insert({
      ...payload,
      user_id: userId,
    });
    if (error) return set({ error: error.message });
    await get().fetchExpenses();
  },
  updateExpense: async (id, payload) => {
    const { error } = await supabase.from("expenses").update(payload).eq("id", id);
    if (error) return set({ error: error.message });
    await get().fetchExpenses();
  },
  deleteExpense: async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) return set({ error: error.message });
    await get().fetchExpenses();
  },
  addCategory: async (payload) => {
    const userId = useAuthStore.getState().user?.id;
    const { error } = await supabase.from("categories").insert({
      ...payload,
      user_id: userId,
    });
    if (error) return set({ error: error.message });
    await get().fetchCategories();
  },
  deleteCategory: async (id) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return set({ error: error.message });
    await get().fetchCategories();
  },
  upsertBudget: async (payload) => {
    const userId = useAuthStore.getState().user?.id;
    const { error } = await supabase.from("budgets").upsert({
      ...payload,
      user_id: userId,
    });
    if (error) return set({ error: error.message });
    await get().fetchBudgets(payload.month);
  },
}));
