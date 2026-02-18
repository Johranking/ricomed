import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search here..."
            className="pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Bell */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Dr. Albert Flores</p>
            <p className="text-xs text-muted-foreground">General Physician</p>
          </div>
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Albert" />
            <AvatarFallback>AF</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
