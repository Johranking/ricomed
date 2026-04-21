import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Check, Flame, Clock, Zap } from "lucide-react";

export default function WorkoutComplete() {
  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-6 animate-slide-up">
        <div className="text-center pt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success mb-4 pulse-red">
            <Check className="w-9 h-9 text-success-foreground" strokeWidth={3} />
          </div>
          <div className="text-xs text-primary tracking-[0.4em] font-bold mb-2">SESSION LOGGED</div>
          <h1 className="font-display text-5xl tracking-wider leading-none">WORKOUT<br/>COMPLETE</h1>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-card border border-border p-6 flex items-center gap-4">
            <Clock className="w-8 h-8 text-primary" />
            <div className="flex-1">
              <div className="text-[10px] text-muted-foreground font-condensed uppercase tracking-widest">Duration</div>
              <div className="font-display text-4xl leading-none mt-1">75 <span className="text-base text-muted-foreground">min</span></div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 flex items-center gap-4">
            <Flame className="w-8 h-8 text-primary" />
            <div className="flex-1">
              <div className="text-[10px] text-muted-foreground font-condensed uppercase tracking-widest">Calories Burned</div>
              <div className="font-display text-4xl leading-none mt-1">12,400</div>
            </div>
          </div>

          <div className="bg-card border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-primary" />
              <div className="font-condensed uppercase tracking-widest text-sm">Effort Score</div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="font-display text-5xl text-primary leading-none">98</div>
              <div className="text-sm text-muted-foreground">/ 100</div>
            </div>
            <div className="w-full bg-muted h-1 mt-3">
              <div className="bg-primary h-full" style={{ width: "98%" }} />
            </div>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground p-5 text-center">
          <div className="font-display text-3xl tracking-widest">"DISCIPLINE = FREEDOM"</div>
        </div>

        <div className="space-y-2">
          <Link to="/calendar">
            <Button variant="outline" className="w-full h-12 font-condensed uppercase tracking-widest">View Calendar</Button>
          </Link>
          <Link to="/">
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 font-condensed uppercase tracking-widest">Back Home</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
