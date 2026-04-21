import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Missed() {
  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-6 animate-slide-up">
        <div className="text-center pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary mb-4">
            <AlertTriangle className="w-9 h-9 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="text-xs text-primary tracking-[0.4em] font-bold mb-2">SESSION LOGGED AS MISSED</div>
          <h1 className="font-display text-5xl tracking-wider leading-none">MISSED A<br/>SESSION?</h1>
        </div>

        <div className="bg-card border border-border p-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            One missed day doesn't break you. Letting it become two does. The vault doesn't care about excuses — only the next rep.
          </p>
          <div className="border-l-4 border-primary pl-4">
            <div className="font-display text-2xl tracking-wider leading-tight">
              "DON'T COUNT THE DAYS YOU MISSED. COUNT THE DAYS YOU SHOWED UP."
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-condensed uppercase tracking-widest text-sm text-muted-foreground">Recovery protocol</div>
          {[
            "Hydrate — 1L water in next hour",
            "10 min mobility / stretch",
            "Plan tomorrow's session NOW",
            "Sleep 7+ hours tonight",
          ].map((step, i) => (
            <div key={i} className="bg-card border border-border p-4 flex items-center gap-4">
              <div className="font-display text-2xl text-primary leading-none w-8">{String(i + 1).padStart(2, "0")}</div>
              <div className="text-sm">{step}</div>
            </div>
          ))}
        </div>

        <Link to="/week">
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 font-condensed uppercase tracking-widest text-lg">
            <RotateCcw className="w-5 h-5 mr-2" /> Reset & Plan Tomorrow
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}
