import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { WORKOUT_PLAN } from "@/data/workouts";
import { ChevronRight, Moon } from "lucide-react";

export default function WeekPlan() {
  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-5 animate-slide-up">
        <div>
          <div className="text-xs text-primary tracking-[0.4em] font-bold mb-1">WEEKLY PROTOCOL</div>
          <h1 className="font-display text-5xl tracking-wider leading-none">YOUR<br/>TRAINING<br/>WEEK</h1>
          <p className="text-sm text-muted-foreground mt-3">7-day split. Hit each day with intent.</p>
        </div>

        <div className="space-y-3">
          {WORKOUT_PLAN.map((day) => (
            <Link
              key={day.id}
              to={`/workout/${day.id}`}
              className="block relative overflow-hidden border border-border bg-card hover:border-primary transition-colors group"
            >
              <div className="absolute top-0 left-0 bg-primary px-3 py-1">
                <div className="text-[9px] tracking-[0.3em] font-bold text-primary-foreground">DAY {day.dayNumber}</div>
              </div>
              <div className="p-5 pt-9 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-primary tracking-[0.4em] font-bold mb-1">{day.weekday.toUpperCase()}</div>
                  <h3 className="font-display text-2xl tracking-wider leading-tight">{day.title.toUpperCase()}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{day.subtitle}</p>
                </div>
                {day.isRest ? (
                  <Moon className="w-7 h-7 text-muted-foreground" />
                ) : (
                  <div className="text-right">
                    <div className="font-display text-3xl text-primary leading-none">{day.exercises.length}</div>
                    <div className="text-[9px] text-muted-foreground tracking-widest font-condensed uppercase">moves</div>
                  </div>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <Link to="/vault" className="block bg-primary text-primary-foreground p-5 text-center hover:bg-primary/90 transition-colors">
          <div className="font-display text-2xl tracking-widest">READY TO ENTER THE VAULT?</div>
          <div className="text-xs mt-1 opacity-90 tracking-wider">Discover your identity</div>
        </Link>
      </div>
    </AppLayout>
  );
}
