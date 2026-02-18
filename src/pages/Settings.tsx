import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Lock, Palette, Shield, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy", icon: Shield },
];

export default function Settings() {
  const [active, setActive] = useState("profile");

  return (
    <DashboardLayout title="Settings">
      <div className="animate-fade-in flex gap-6">
        {/* Settings Nav */}
        <div className="w-56 shrink-0">
          <div className="bg-card rounded-xl shadow-card p-2 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active === s.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-card rounded-xl shadow-card p-6 space-y-6">
          {active === "profile" && (
            <>
              <h2 className="text-lg font-bold text-foreground">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Albert" />
                  <AvatarFallback>AF</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">Dr. Albert Flores</p>
                  <p className="text-sm text-muted-foreground">General Physician</p>
                  <button className="text-xs text-primary hover:underline mt-1">Change photo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: "Albert" },
                  { label: "Last Name", value: "Flores" },
                  { label: "Email", value: "albert.flores@medbay.com" },
                  { label: "Phone", value: "+1 (555) 123-4567" },
                  { label: "Specialization", value: "General Physician" },
                  { label: "License Number", value: "MED-2024-001" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                    />
                  </div>
                ))}
              </div>
              <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </>
          )}

          {active === "notifications" && (
            <>
              <h2 className="text-lg font-bold text-foreground">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Critical Alerts", desc: "Receive notifications for critical patient alerts" },
                  { label: "Appointment Reminders", desc: "Get reminded before upcoming appointments" },
                  { label: "Lab Results", desc: "Notify when new lab results are available" },
                  { label: "Messages", desc: "Receive new message notifications" },
                  { label: "System Updates", desc: "Important system and security updates" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <button className="w-10 h-6 bg-primary rounded-full relative">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {active === "security" && (
            <>
              <h2 className="text-lg font-bold text-foreground">Security Settings</h2>
              <div className="space-y-4 max-w-md">
                {[
                  { label: "Current Password", type: "password" },
                  { label: "New Password", type: "password" },
                  { label: "Confirm New Password", type: "password" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-medium text-muted-foreground block mb-1">{f.label}</label>
                    <input type={f.type} placeholder="••••••••" className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                ))}
                <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Update Password
                </button>
              </div>
            </>
          )}

          {active === "appearance" && (
            <>
              <h2 className="text-lg font-bold text-foreground">Appearance</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Customize the look and feel of your dashboard.</p>
                <div className="grid grid-cols-3 gap-3">
                  {["Light", "Dark", "System"].map((t) => (
                    <button key={t} className={cn("py-3 px-4 border-2 rounded-xl text-sm font-medium transition-colors", t === "Light" ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {active === "privacy" && (
            <>
              <h2 className="text-lg font-bold text-foreground">Privacy Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "Profile Visibility", desc: "Allow other staff to see your profile" },
                  { label: "Activity Status", desc: "Show when you are online" },
                  { label: "Data Analytics", desc: "Share usage data to improve the platform" },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <button className="w-10 h-6 bg-muted rounded-full relative border border-border">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
