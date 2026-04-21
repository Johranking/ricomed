import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, Dumbbell, Video, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/week", icon: Dumbbell, label: "Plan" },
  { to: "/calendar", icon: Calendar, label: "Calendar" },
  { to: "/videos", icon: Video, label: "Vault" },
  { to: "/profile", icon: User, label: "Me" },
];

export default function AppLayout({ children, hideNav }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top brand bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary flex items-center justify-center">
              <Lock className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
            </div>
            <div className="leading-none">
              <div className="font-display text-lg tracking-widest">IRON KINETIC</div>
              <div className="text-[9px] text-primary tracking-[0.3em] font-bold">/ FREEDOM</div>
            </div>
          </NavLink>
          <NavLink to="/profile" className="text-xs font-condensed uppercase tracking-wider text-muted-foreground hover:text-primary">
            Profile
          </NavLink>
        </div>
      </header>

      <main className={cn("flex-1 max-w-md w-full mx-auto pb-24", !hideNav && "pb-24")}>
        {children}
      </main>

      {/* Bottom nav */}
      {!hideNav && (
        <nav className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border">
          <div className="max-w-md mx-auto grid grid-cols-5">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center py-3 gap-1 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[10px] font-condensed uppercase tracking-wider">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
