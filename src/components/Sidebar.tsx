import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Calendar,
  MessageSquare,
  Settings,
  Menu,
  X,
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

function NavContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  return (
    <>
      {/* Logo */}
      <div className="px-5 mb-8 flex items-center justify-between">
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
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))]"
                  : "text-[hsl(var(--sidebar-foreground))] hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive
                    ? "text-[hsl(var(--sidebar-accent-foreground))]"
                    : "text-[hsl(var(--sidebar-foreground))]"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-muted transition-colors md:hidden"
    >
      <Menu className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[200px] min-h-screen bg-card border-r border-border flex-col py-6 shrink-0">
        <NavContent />
      </aside>

      {/* Mobile hamburger trigger — rendered in Header via context, but we also export the button */}
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[240px] bg-card border-r border-border flex flex-col py-6 transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Floating mobile menu button (top-left) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-card border border-border shadow-sm hover:bg-muted transition-colors md:hidden"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>
    </>
  );
}
