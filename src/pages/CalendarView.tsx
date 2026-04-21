import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useWorkoutLogs, formatDate } from "@/hooks/useWorkoutLogs";
import { ChevronLeft, ChevronRight, Check, X, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarView() {
  const { logs, upsertLog, completedCount, streak } = useWorkoutLogs();
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Monday-first offset
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const logMap = new Map(logs.map((l) => [l.log_date, l]));
  const today = formatDate(new Date());
  const selectedKey = selected ? formatDate(selected) : null;
  const selectedLog = selectedKey ? logMap.get(selectedKey) : null;

  const handleMark = async (status: "completed" | "missed" | "rest") => {
    if (!selected) return;
    const { error } = await upsertLog({
      log_date: formatDate(selected),
      status,
      workout_type: null,
      duration_min: status === "completed" ? 60 : null,
      calories: status === "completed" ? 450 : null,
      notes: null,
    });
    if (error) toast.error(error);
    else toast.success("Saved");
  };

  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-5 animate-slide-up">
        <div>
          <div className="text-xs text-primary tracking-[0.4em] font-bold mb-1">CHECK-IN</div>
          <h1 className="font-display text-5xl tracking-wider leading-none">CALENDAR</h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border p-4">
            <div className="text-[10px] text-muted-foreground font-condensed uppercase tracking-widest">Streak</div>
            <div className="font-display text-3xl text-primary mt-1">{streak} <span className="text-sm text-muted-foreground">days</span></div>
          </div>
          <div className="bg-card border border-border p-4">
            <div className="text-[10px] text-muted-foreground font-condensed uppercase tracking-widest">Total</div>
            <div className="font-display text-3xl mt-1">{completedCount} <span className="text-sm text-muted-foreground">sessions</span></div>
          </div>
        </div>

        <div className="bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="p-1 text-muted-foreground hover:text-primary">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-condensed uppercase tracking-widest text-sm">{MONTH_NAMES[month]} {year}</div>
            <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="p-1 text-muted-foreground hover:text-primary">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-[10px] text-center text-muted-foreground font-condensed uppercase tracking-widest">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />;
              const key = formatDate(date);
              const log = logMap.get(key);
              const isToday = key === today;
              const isSelected = key === selectedKey;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(date)}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center text-xs border transition-colors relative",
                    isSelected ? "border-primary bg-primary/10" : "border-border",
                    isToday && !isSelected && "border-foreground",
                    log?.status === "completed" && "bg-success/20 border-success",
                    log?.status === "missed" && "bg-primary/20 border-primary",
                    log?.status === "rest" && "bg-muted border-border"
                  )}
                >
                  <span className={cn("font-mono", isToday && "font-bold")}>{date.getDate()}</span>
                  {log?.status === "completed" && <Check className="w-3 h-3 text-success absolute bottom-0.5" strokeWidth={3} />}
                  {log?.status === "missed" && <X className="w-3 h-3 text-primary absolute bottom-0.5" strokeWidth={3} />}
                  {log?.status === "rest" && <Moon className="w-2.5 h-2.5 text-muted-foreground absolute bottom-0.5" />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground font-condensed uppercase tracking-wider">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-success" /> Trained</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-primary" /> Missed</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-muted-foreground" /> Rest</div>
          </div>
        </div>

        {selected && (
          <div className="bg-card border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground font-condensed uppercase tracking-widest">Selected</div>
                <div className="font-condensed uppercase tracking-wider text-base">{selected.toDateString()}</div>
              </div>
              {selectedLog && (
                <div className={cn(
                  "px-2 py-1 text-[10px] font-condensed uppercase tracking-widest",
                  selectedLog.status === "completed" && "bg-success text-success-foreground",
                  selectedLog.status === "missed" && "bg-primary text-primary-foreground",
                  selectedLog.status === "rest" && "bg-muted text-muted-foreground"
                )}>{selectedLog.status}</div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleMark("completed")} className="border border-border bg-background hover:border-success py-3 flex flex-col items-center gap-1 transition-colors">
                <Check className="w-4 h-4 text-success" />
                <span className="text-[10px] font-condensed uppercase tracking-wider">Trained</span>
              </button>
              <button onClick={() => handleMark("missed")} className="border border-border bg-background hover:border-primary py-3 flex flex-col items-center gap-1 transition-colors">
                <X className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-condensed uppercase tracking-wider">Missed</span>
              </button>
              <button onClick={() => handleMark("rest")} className="border border-border bg-background hover:border-foreground py-3 flex flex-col items-center gap-1 transition-colors">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-condensed uppercase tracking-wider">Rest</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
