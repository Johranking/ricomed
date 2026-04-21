import { useParams, Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { WORKOUT_PLAN, getDayByWeekday } from "@/data/workouts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Moon, Play } from "lucide-react";
import { useWorkoutLogs, formatDate } from "@/hooks/useWorkoutLogs";
import { toast } from "sonner";

export default function WorkoutDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const day = WORKOUT_PLAN.find((d) => d.id === id);
  const { upsertLog } = useWorkoutLogs();

  if (!day) {
    return (
      <AppLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Workout not found.</p>
          <Link to="/week" className="text-primary mt-4 inline-block">← Back to plan</Link>
        </div>
      </AppLayout>
    );
  }

  const handleComplete = async () => {
    const { error } = await upsertLog({
      log_date: formatDate(new Date()),
      status: "completed",
      workout_type: day.title,
      duration_min: 75,
      calories: 12400 / 25, // example mapping
      notes: null,
    });
    if (error) toast.error(error);
    else nav("/complete");
  };

  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-6 animate-slide-up">
        <Link to="/week" className="inline-flex items-center gap-2 text-xs font-condensed uppercase tracking-widest text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to week
        </Link>

        <div className="relative overflow-hidden border border-border bg-gradient-dark">
          <div className="absolute top-0 right-0 bg-primary px-3 py-1">
            <div className="text-[9px] tracking-[0.3em] font-bold text-primary-foreground">DAY {day.dayNumber}</div>
          </div>
          <div className="p-6">
            <div className="text-xs text-primary tracking-[0.4em] font-bold mb-2">{day.weekday.toUpperCase()}</div>
            <h1 className="font-display text-5xl leading-none tracking-wider">{day.title.toUpperCase()}</h1>
            <p className="text-sm text-muted-foreground mt-2">{day.subtitle}</p>
          </div>
        </div>

        {day.isRest ? (
          <div className="bg-card border border-border p-8 text-center space-y-4">
            <Moon className="w-12 h-12 text-primary mx-auto" />
            <div className="font-display text-3xl tracking-widest">RECOVER</div>
            <p className="text-sm text-muted-foreground">Rest is when growth happens. Sleep deep, eat clean, return stronger.</p>
            <Button onClick={() => upsertLog({ log_date: formatDate(new Date()), status: "rest", workout_type: day.title, duration_min: null, calories: null, notes: null })} variant="outline" className="font-condensed uppercase tracking-wider">
              <Check className="w-4 h-4 mr-2" /> Log Rest Day
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h2 className="font-condensed uppercase tracking-widest text-sm text-muted-foreground mb-3">Exercises</h2>
              {day.exercises.map((ex, i) => (
                <div key={i} className="bg-card border border-border p-4 flex items-start gap-4">
                  <div className="font-display text-2xl text-primary leading-none w-8">{String(i + 1).padStart(2, "0")}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-condensed uppercase tracking-wider text-base">{ex.exercise}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {ex.sets.map((s, j) => (
                        <span key={j} className="text-[10px] font-mono bg-muted px-2 py-1 text-muted-foreground">
                          {typeof s === "number" ? `${s} reps` : s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Link to="/videos" className="block bg-card border border-border p-4 text-center hover:border-primary transition-colors">
                <Play className="w-5 h-5 mx-auto text-primary mb-1" />
                <div className="text-xs font-condensed uppercase tracking-widest">Watch form videos</div>
              </Link>
              <Button onClick={handleComplete} className="w-full h-14 bg-primary hover:bg-primary/90 font-condensed uppercase tracking-widest text-lg">
                <Check className="w-5 h-5 mr-2" strokeWidth={3} /> Mark Complete
              </Button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
