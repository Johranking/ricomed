import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Flame, Trophy, Calendar } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { completedCount, streak, logs } = useWorkoutLogs();
  const [displayName, setDisplayName] = useState<string>("Athlete");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).single().then(({ data }) => {
      if (data) {
        setDisplayName(data.display_name || user.email?.split("@")[0] || "Athlete");
        setAvatar(data.avatar_url);
      }
    });
  }, [user]);

  const missedCount = logs.filter((l) => l.status === "missed").length;
  const restCount = logs.filter((l) => l.status === "rest").length;

  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-6 animate-slide-up">
        <div className="bg-gradient-dark border border-border p-6 flex items-center gap-4">
          {avatar ? (
            <img src={avatar} alt={displayName} className="w-16 h-16 object-cover border border-primary" />
          ) : (
            <div className="w-16 h-16 bg-primary flex items-center justify-center font-display text-3xl text-primary-foreground">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-primary tracking-[0.4em] font-bold">MEMBER</div>
            <div className="font-display text-3xl tracking-wider truncate">{displayName.toUpperCase()}</div>
            <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card border border-border p-4 text-center">
            <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="font-display text-2xl">{streak}</div>
            <div className="text-[9px] text-muted-foreground font-condensed uppercase tracking-widest">Streak</div>
          </div>
          <div className="bg-card border border-border p-4 text-center">
            <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="font-display text-2xl">{completedCount}</div>
            <div className="text-[9px] text-muted-foreground font-condensed uppercase tracking-widest">Trained</div>
          </div>
          <div className="bg-card border border-border p-4 text-center">
            <Calendar className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
            <div className="font-display text-2xl">{restCount}</div>
            <div className="text-[9px] text-muted-foreground font-condensed uppercase tracking-widest">Rest</div>
          </div>
        </div>

        <div className="bg-card border border-border p-5">
          <div className="font-condensed uppercase tracking-widest text-sm text-muted-foreground mb-3">All-Time Stats</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Sessions completed</span><span className="font-mono">{completedCount}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Sessions missed</span><span className="font-mono text-primary">{missedCount}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rest days</span><span className="font-mono">{restCount}</span></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="text-muted-foreground">Total logged days</span><span className="font-mono font-bold">{logs.length}</span></div>
          </div>
        </div>

        <Button onClick={signOut} variant="outline" className="w-full h-12 font-condensed uppercase tracking-widest border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </div>
    </AppLayout>
  );
}
