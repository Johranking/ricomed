import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { VIDEOS } from "@/data/videos";
import { Play, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Chest + Triceps", "Back + Biceps", "Shoulders + Abs", "Legs", "Arms", "Recovery"];

export default function Videos() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === active);

  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-5 animate-slide-up">
        <div>
          <div className="text-xs text-primary tracking-[0.4em] font-bold mb-1">FORM VAULT</div>
          <h1 className="font-display text-5xl tracking-wider leading-none">VIDEOS</h1>
          <p className="text-sm text-muted-foreground mt-3">Curated. No fluff. Watch. Apply.</p>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "shrink-0 px-3 py-1.5 text-[10px] font-condensed uppercase tracking-widest border transition-colors",
                active === c ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground hover:border-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((v) => (
            <a
              key={v.youtubeId}
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-card border border-border hover:border-primary transition-colors group"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-hero" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-primary/90 group-hover:bg-primary flex items-center justify-center transition-colors">
                    <Play className="w-6 h-6 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-background/90 px-2 py-0.5">
                  <div className="text-[9px] font-condensed uppercase tracking-widest">{v.category}</div>
                </div>
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-tight line-clamp-2">{v.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{v.channel}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
