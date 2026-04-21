import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { getTodaysWorkout, WORKOUT_PLAN } from "@/data/workouts";
import { useWorkoutLogs, formatDate } from "@/hooks/useWorkoutLogs";
import { Button } from "@/components/ui/button";
import { Flame, Check, X, ChevronRight, Play, Calendar as CalIcon } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const today = getTodaysWorkout();
  const { logs, upsertLog, streak, completedCount } = useWorkoutLogs();
  const todayDate = formatDate(new Date());
  const todayLog = logs.find((l) => l.log_date === todayDate);

  const markStatus = async (status: "completed" | "missed" | "rest") => {
    const { error } = await upsertLog({
      log_date: todayDate,
      status,
      workout_type: today.title,
      duration_min: status === "completed" ? 60 : null,
      calories: status === "completed" ? 450 : null,
      notes: null,
    });
    if (error) toast.error(error);
    else toast.success(status === "completed" ? "Logged. Lock in." : status === "missed" ? "Marked missed." : "Rest day logged.");
  };

  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-6 animate-slide-up">
        {/* Streak banner */}
        <div className="flex items-center justify-between bg-card border border-border p-4">
          <div>
            <div className="text-[10px] tracking-widest text-muted-foreground font-condensed uppercase">Current Streak</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-4xl text-primary leading-none">{streak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-widest text-muted-foreground font-condensed uppercase">Total</div>
            <div className="flex items-baseline gap-2 mt-1 justify-end">
              <span className="font-display text-4xl leading-none">{completedCount}</span>
              <Flame className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Today's workout hero card */}
        <div className="relative overflow-hidden border border-border bg-gradient-dark">
          <div className="absolute top-0 right-0 bg-primary px-3 py-1">
            <div className="text-[9px] tracking-[0.3em] font-bold text-primary-foreground">DAY {today.dayNumber}</div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className="text-xs text-primary tracking-[0.4em] font-bold mb-2">{today.weekday.toUpperCase()}</div>
              <h1 className="font-display text-5xl leading-none tracking-wider">{today.title.toUpperCase()}</h1>
              <p className="text-sm text-muted-foreground mt-2">{today.subtitle}</p>
            </div>

            {!today.isRest && (
              <div className="space-y-1.5 pt-2 border-t border-border">
                {today.exercises.slice(0, 4).map((ex, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{ex.exercise}</span>
                    <span className="text-muted-foreground text-xs font-mono">{Array.isArray(ex.sets) ? ex.sets.length : 0} sets</span>
                  </div>
                ))}
                {today.exercises.length > 4 && (
                  <div className="text-xs text-primary pt-1">+ {today.exercises.length - 4} more</div>
                )}
              </div>
            )}

            <Link to={`/workout/${today.id}`}>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 font-condensed uppercase tracking-widest text-base">
                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                {today.isRest ? "View Recovery" : "Start Workout"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Today's status */}
        <div>
          <h2 className="font-condensed uppercase tracking-widest text-sm text-muted-foreground mb-3">Did you train today?</h2>
          {todayLog?.status === "completed" ? (
            <Link to="/complete" className="block">
              <div className="bg-success/10 border border-success p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-success flex items-center justify-center"><Check className="w-6 h-6 text-success-foreground" strokeWidth={3} /></div>
                <div className="flex-1">
                  <div className="font-condensed uppercase tracking-wider text-success">Workout Complete</div>
                  <div className="text-xs text-muted-foreground">View your stats</div>
                </div>
                <ChevronRight className="w-5 h-5 text-success" />
              </div>
            </Link>
          ) : todayLog?.status === "missed" ? (
            <Link to="/missed" className="block">
              <div className="bg-primary/10 border border-primary p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center"><X className="w-6 h-6 text-primary-foreground" strokeWidth={3} /></div>
                <div className="flex-1">
                  <div className="font-condensed uppercase tracking-wider text-primary">Session Missed</div>
                  <div className="text-xs text-muted-foreground">Get back on track</div>
                </div>
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </Link>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => markStatus("completed")} className="border border-border bg-card hover:border-success py-3 flex flex-col items-center gap-1 transition-colors">
                <Check className="w-5 h-5 text-success" />
                <span className="text-[10px] font-condensed uppercase tracking-wider">Trained</span>
              </button>
              <button onClick={() => markStatus("missed")} className="border border-border bg-card hover:border-primary py-3 flex flex-col items-center gap-1 transition-colors">
                <X className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-condensed uppercase tracking-wider">Missed</span>
              </button>
              <button onClick={() => markStatus("rest")} className="border border-border bg-card hover:border-foreground py-3 flex flex-col items-center gap-1 transition-colors">
                <CalIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] font-condensed uppercase tracking-wider">Rest</span>
              </button>
            </div>
          )}
        </div>

        {/* Week strip */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-condensed uppercase tracking-widest text-sm text-muted-foreground">This Week</h2>
            <Link to="/week" className="text-xs text-primary tracking-wider">VIEW ALL →</Link>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {WORKOUT_PLAN.map((d) => (
              <Link key={d.id} to={`/workout/${d.id}`} className="bg-card border border-border p-2 flex flex-col items-center gap-1 hover:border-primary transition-colors">
                <div className="text-[9px] font-condensed uppercase text-muted-foreground tracking-wider">{d.weekday.slice(0, 3)}</div>
                <div className={`w-2 h-2 ${d.isRest ? "bg-muted" : "bg-primary"}`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/vault" className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="font-display text-2xl tracking-widest text-primary">THE VAULT</div>
            <div className="text-xs text-muted-foreground mt-1">Identity & lore</div>
          </Link>
          <Link to="/videos" className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="font-display text-2xl tracking-widest">VIDEOS</div>
            <div className="text-xs text-muted-foreground mt-1">Form & technique</div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
