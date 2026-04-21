import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type WorkoutLog = {
  id: string;
  log_date: string; // YYYY-MM-DD
  status: "completed" | "missed" | "rest";
  workout_type: string | null;
  duration_min: number | null;
  calories: number | null;
  notes: string | null;
};

export function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function useWorkoutLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setLogs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("workout_logs")
      .select("*")
      .order("log_date", { ascending: false });
    if (!error && data) setLogs(data as WorkoutLog[]);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const upsertLog = async (log: Omit<WorkoutLog, "id"> & { id?: string }) => {
    if (!user) return { error: "Not signed in" };
    const payload = { ...log, user_id: user.id };
    const { error } = await supabase
      .from("workout_logs")
      .upsert(payload, { onConflict: "user_id,log_date" });
    if (!error) await refresh();
    return { error: error?.message ?? null };
  };

  const deleteLog = async (date: string) => {
    if (!user) return;
    await supabase.from("workout_logs").delete().eq("log_date", date);
    await refresh();
  };

  // Stats
  const completed = logs.filter((l) => l.status === "completed");
  const streak = (() => {
    const set = new Set(completed.map((l) => l.log_date));
    let s = 0;
    const d = new Date();
    while (set.has(formatDate(d))) {
      s += 1;
      d.setDate(d.getDate() - 1);
    }
    return s;
  })();

  return { logs, loading, refresh, upsertLog, deleteLog, completedCount: completed.length, streak };
}
