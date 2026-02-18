import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Patients", icon: Users, path: "/patients" },
  { label: "Appointments", icon: CalendarDays, path: "/appointments" },
  { label: "Calendar", icon: Calendar, path: "/calendar" },
  { label: "Messages", icon: MessageSquare, path: "/messages" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[200px] min-h-screen bg-card border-r border-border flex flex-col py-6 shrink-0">
      {/* Logo */}
      <div className="px-5 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5 p-1.5">
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-sm" />
            </div>
          </div>
          <span className="font-bold text-lg text-foreground">Medbay</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map((item) => {
          const isActive = item.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
                  : "text-[hsl(var(--sidebar-foreground))] hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-[hsl(var(--sidebar-accent-foreground))]" : "text-[hsl(var(--sidebar-foreground))]"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
