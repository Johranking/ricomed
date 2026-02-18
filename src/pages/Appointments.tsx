import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { Plus, Filter, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const appointments = [
  { id: 1, time: "9.30 am", patient: "Marvin McKinney", pid: 2, type: "Chest pain & dizziness", doctor: "Dr. Albert Flores", room: "Room 101", status: "In Consultation" },
  { id: 2, time: "9.45 am", patient: "Floyd Miles", pid: 3, type: "Diabetes follow-up", doctor: "Dr. Albert Flores", room: "Room 102", status: "Waiting" },
  { id: 3, time: "10.00 am", patient: "Jerome Bell", pid: 4, type: "Abdominal pain", doctor: "Dr. Albert Flores", room: "Room 101", status: "Checked-in" },
  { id: 4, time: "10.10 am", patient: "Annette Black", pid: 5, type: "Sore throat", doctor: "Dr. Albert Flores", room: "Room 103", status: "Scheduled" },
  { id: 5, time: "10.10 am", patient: "Kathryn Murphy", pid: 6, type: "Post-surgery review", doctor: "Dr. Albert Flores", room: "Room 104", status: "Scheduled" },
  { id: 6, time: "11.00 am", patient: "Robert Fox", pid: 7, type: "Back pain evaluation", doctor: "Dr. Albert Flores", room: "Room 102", status: "Scheduled" },
  { id: 7, time: "11.30 am", patient: "Bessie Cooper", pid: 8, type: "Arthritis check-up", doctor: "Dr. Albert Flores", room: "Room 105", status: "Scheduled" },
  { id: 8, time: "2.00 pm", patient: "Darlene Robertson", pid: 1, type: "GERD follow-up", doctor: "Dr. Albert Flores", room: "Room 101", status: "Scheduled" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "In Consultation": "text-primary bg-primary/10",
    Waiting: "text-[hsl(35,85%,45%)] bg-[hsl(35,90%,92%)]",
    "Checked-in": "text-[hsl(145,60%,38%)] bg-[hsl(145,60%,94%)]",
    Scheduled: "text-muted-foreground bg-muted",
  };
  return (
    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", colors[status] ?? "text-foreground bg-muted")}>
      {status}
    </span>
  );
}

export default function Appointments() {
  return (
    <DashboardLayout title="Appointments">
      <div className="animate-fade-in space-y-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Today", value: 8, color: "bg-primary/10 text-primary" },
            { label: "In Consultation", value: 1, color: "bg-[hsl(145,60%,94%)] text-[hsl(145,60%,38%)]" },
            { label: "Waiting", value: 2, color: "bg-[hsl(35,90%,92%)] text-[hsl(35,85%,45%)]" },
            { label: "Scheduled", value: 5, color: "bg-muted text-muted-foreground" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl shadow-card p-4">
              <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
              <p className={cn("text-2xl font-bold px-2 py-0.5 rounded-lg inline-block", s.color)}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Today's Appointments</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                <Plus className="w-4 h-4" /> New Appointment
              </button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-muted-foreground text-xs">
                <th className="text-left px-5 py-3 font-medium">Time</th>
                <th className="text-left px-4 py-3 font-medium">Patient</th>
                <th className="text-left px-4 py-3 font-medium">Reason</th>
                <th className="text-left px-4 py-3 font-medium">Doctor</th>
                <th className="text-left px-4 py-3 font-medium">Room</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-muted-foreground">{a.time}</td>
                  <td className="px-4 py-3">
                    <Link to={`/patients/${a.pid}`} className="flex items-center gap-2 hover:text-primary">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.patient}`} />
                        <AvatarFallback>{a.patient.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{a.patient}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground">{a.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.doctor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.room}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground"><MoreHorizontal className="w-4 h-4" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
