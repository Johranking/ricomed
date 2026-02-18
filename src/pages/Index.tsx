import DashboardLayout from "@/components/DashboardLayout";
import { CalendarDays, Users, AlertTriangle, FlaskConical, MoreHorizontal, Play, Plus, TestTube, Pill } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const stats = [
  { label: "Appointments Today", value: 25, icon: CalendarDays, bg: "bg-[hsl(210,85%,96%)]", iconColor: "text-[hsl(210,85%,48%)]" },
  { label: "Patients Waiting", value: 6, icon: Users, bg: "bg-[hsl(35,90%,95%)]", iconColor: "text-[hsl(35,85%,55%)]" },
  { label: "Critical Alerts", value: 2, icon: AlertTriangle, bg: "bg-[hsl(0,75%,95%)]", iconColor: "text-[hsl(0,75%,55%)]" },
  { label: "Pending Lab Results", value: 4, icon: FlaskConical, bg: "bg-[hsl(185,55%,95%)]", iconColor: "text-[hsl(185,60%,40%)]" },
];

const criticalAlerts = [
  { time: "9.30 am", name: "Marvin McKinney", alert: "BP 182/118", severity: "Critical" },
  { time: "9.45 am", name: "Floyd Miles", alert: "Glucose 44 mg/dL", severity: "Critical" },
  { time: "10.00 am", name: "Jerome Bell", alert: "Glucose 54 mg/dL", severity: "Critical" },
  { time: "10.10 am", name: "Annette Black", alert: "Abnormal ECG", severity: "Critical" },
  { time: "10.10 am", name: "Annette Black", alert: "Missed follow-up", severity: "Info" },
];

const appointments = [
  { time: "9.30 am", name: "Marvin McKinney", reason: "Chest pain & dizziness", status: "In Consultation" },
  { time: "9.45 am", name: "Floyd Miles", reason: "Diabetes follow-up", status: "Waiting" },
  { time: "10.00 am", name: "Jerome Bell", reason: "Abdominal pain", status: "Checked-in" },
  { time: "10.10 am", name: "Annette Black", reason: "Sore throat", status: "Scheduled" },
  { time: "10.10 am", name: "Annette Black", reason: "Post-surgery review", status: "Scheduled" },
  { time: "10.10 am", name: "Annette Black", reason: "Sore throat", status: "Scheduled" },
];

const labResults = [
  { name: "Marvin McKinney", reason: "Lipid Panel", status: "Ready" },
  { name: "Floyd Miles", reason: "HbA1c", status: "Processing" },
  { name: "Jerome Bell", reason: "CBC", status: "Processing" },
  { name: "Annette Black", reason: "Thyroid Profile", status: "Ready" },
];

const tasks = [
  { task: "Review Lab Result", patient: "Floyd Miles", time: "Today, 11:00 AM" },
  { task: "Follow-up Call", patient: "HbA1c", time: "Today, 12:30 PM" },
  { task: "Update Visit Notes", patient: "Jerome Bell", time: "Today, 02:00 PM" },
  { task: "Schedule Follow-up Visit", patient: "Annette Black", time: "Tomorrow" },
];

const todaysPatients = [
  { name: "Kathryn Murphy", alert: true },
  { name: "Arlene McCoy", alert: false },
  { name: "Marvin McKinney", alert: true },
  { name: "Robert Fox", alert: false },
  { name: "Bessie Cooper", alert: true },
  { name: "Leslie Alexander", alert: false },
  { name: "Darlene Robertson", alert: false },
  { name: "Wade Warren", alert: false },
  { name: "Kristin Watson", alert: false },
];

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    Critical: "text-destructive bg-destructive/10",
    Info: "text-muted-foreground bg-muted",
  };
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", colors[severity] ?? "text-foreground bg-muted")}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "In Consultation": "text-primary bg-primary/10",
    Waiting: "text-[hsl(35,85%,45%)] bg-[hsl(35,90%,92%)]",
    "Checked-in": "text-[hsl(145,60%,38%)] bg-[hsl(145,60%,94%)]",
    Scheduled: "text-muted-foreground bg-muted",
    Ready: "text-[hsl(145,60%,38%)] bg-[hsl(145,60%,94%)]",
    Processing: "text-[hsl(35,85%,45%)] bg-[hsl(35,90%,92%)]",
  };
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", colors[status] ?? "text-foreground bg-muted")}>
      {status}
    </span>
  );
}

export default function Index() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col xl:flex-row gap-6 animate-fade-in">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Today's Overview */}
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">Today's Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className={cn("rounded-xl p-4 flex flex-col gap-3", s.bg)}>
                  <s.icon className={cn("w-6 h-6", s.iconColor)} />
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Critical Alerts */}
            <div className="bg-card rounded-xl shadow-card p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Critical Alerts</h3>
                <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs">
                    <th className="text-left pb-2 font-medium">Time</th>
                    <th className="text-left pb-2 font-medium">Name</th>
                    <th className="text-left pb-2 font-medium">Alert</th>
                    <th className="text-left pb-2 font-medium">Severity</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {criticalAlerts.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2 text-muted-foreground text-xs">{row.time}</td>
                      <td className="py-2 font-medium text-foreground">{row.name}</td>
                      <td className="py-2 text-foreground">{row.alert}</td>
                      <td className="py-2"><SeverityBadge severity={row.severity} /></td>
                      <td className="py-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pending Lab Results */}
            <div className="bg-card rounded-xl shadow-card p-4 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Pending Lab Results</h3>
                <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs">
                    <th className="text-left pb-2 font-medium">Name</th>
                    <th className="text-left pb-2 font-medium">Reason For Visit</th>
                    <th className="text-left pb-2 font-medium">Status</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {labResults.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2 font-medium text-foreground">{row.name}</td>
                      <td className="py-2 text-foreground">{row.reason}</td>
                      <td className="py-2"><StatusBadge status={row.status} /></td>
                      <td className="py-2 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Today's Appointments */}
            <div className="bg-card rounded-xl shadow-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Todays Appointments</h3>
                <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs">
                    <th className="text-left pb-2 font-medium">Time</th>
                    <th className="text-left pb-2 font-medium">Name</th>
                    <th className="text-left pb-2 font-medium">Reason</th>
                    <th className="text-left pb-2 font-medium">Status</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {appointments.map((row, i) => (
                    <tr key={i}>
                      <td className="py-1.5 text-muted-foreground text-xs">{row.time}</td>
                      <td className="py-1.5 font-medium text-foreground text-xs">{row.name}</td>
                      <td className="py-1.5 text-foreground text-xs">{row.reason}</td>
                      <td className="py-1.5"><StatusBadge status={row.status} /></td>
                      <td className="py-1.5 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-5">
              {/* Tasks & Follow-ups */}
              <div className="bg-card rounded-xl shadow-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Tasks & Follow-ups</h3>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
                <div className="space-y-2">
                  {tasks.map((t, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                      <div>
                        <span className="text-sm text-foreground">{t.task}</span>
                        <span className="text-muted-foreground text-sm"> - {t.patient}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-xl shadow-card p-4">
                <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/appointments" className="flex items-center justify-center gap-2 py-2.5 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Play className="w-4 h-4" /> Start Encounter
                  </Link>
                  <Link to="/patients" className="flex items-center justify-center gap-2 py-2.5 px-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <Plus className="w-4 h-4" /> New Patient
                  </Link>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <TestTube className="w-4 h-4" /> Order Lab
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 px-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                    <Pill className="w-4 h-4" /> Prescribe Medication
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Patients Sidebar */}
        <div className="xl:w-64 xl:shrink-0">
          <h2 className="text-base font-semibold text-foreground mb-3">Today's Patients</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-1 gap-2">
            {todaysPatients.map((p, i) => (
              <Link key={i} to={`/patients/${i + 1}`} className="block bg-card rounded-xl shadow-card p-3 hover:shadow-card-hover transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} />
                      <AvatarFallback className="text-xs">{p.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {p.alert && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />}
                  </div>
                  <span className="text-xs font-medium text-foreground">{p.name}</span>
                </div>
                <div className="flex gap-1.5 text-[10px]">
                  <span className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded">Heartbeat</span>
                  <span className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded">BP</span>
                  <span className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded">Temp</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
