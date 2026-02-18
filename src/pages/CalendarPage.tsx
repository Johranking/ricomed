import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const events: Record<string, { title: string; color: string }[]> = {
  "2026-2-11": [{ title: "Darlene Robertson - OPD", color: "bg-primary/20 text-primary" }],
  "2026-2-18": [{ title: "Floyd Miles - Labs", color: "bg-[hsl(35,90%,92%)] text-[hsl(35,85%,45%)]" }, { title: "Marvin McKinney - BP Check", color: "bg-destructive/10 text-destructive" }],
  "2026-2-20": [{ title: "Team Meeting", color: "bg-[hsl(145,60%,94%)] text-[hsl(145,60%,38%)]" }],
  "2026-2-25": [{ title: "Jerome Bell - Follow-up", color: "bg-primary/20 text-primary" }],
};

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  return (
    <DashboardLayout title="Calendar">
      <div className="animate-fade-in space-y-5">
        <div className="bg-card rounded-xl shadow-card p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">{MONTHS[month]} {year}</h2>
            <div className="flex items-center gap-2">
              <button onClick={prev} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button onClick={next} className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 ml-2">
                <Plus className="w-4 h-4" /> Add Event
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const key = day ? `${year}-${month}-${day}` : null;
              const evs = key ? events[key] ?? [] : [];
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              return (
                <div
                  key={i}
                  className={cn(
                    "min-h-[90px] p-2 rounded-lg border",
                    day ? "border-border hover:bg-muted/30 cursor-pointer" : "border-transparent",
                    isToday && "bg-primary/5 border-primary/30"
                  )}
                >
                  {day && (
                    <>
                      <span className={cn(
                        "text-sm font-medium inline-flex w-7 h-7 items-center justify-center rounded-full",
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                      )}>{day}</span>
                      <div className="mt-1 space-y-1">
                        {evs.map((ev, j) => (
                          <div key={j} className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium truncate", ev.color)}>
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
