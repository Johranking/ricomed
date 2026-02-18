import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const patients = [
  { id: 1, name: "Darlene Robertson", age: 41, gender: "Female", mrn: "MB-204", blood: "O+", condition: "Acute Gastritis", status: "Active", lastVisit: "11 Jan 2026" },
  { id: 2, name: "Marvin McKinney", age: 55, gender: "Male", mrn: "MB-201", blood: "A+", condition: "Hypertension", status: "Critical", lastVisit: "10 Jan 2026" },
  { id: 3, name: "Floyd Miles", age: 48, gender: "Male", mrn: "MB-202", blood: "B-", condition: "Diabetes Type 2", status: "Active", lastVisit: "10 Jan 2026" },
  { id: 4, name: "Jerome Bell", age: 63, gender: "Male", mrn: "MB-203", blood: "AB+", condition: "Abdominal Pain", status: "Checked-in", lastVisit: "9 Jan 2026" },
  { id: 5, name: "Annette Black", age: 37, gender: "Female", mrn: "MB-205", blood: "O-", condition: "Sore Throat", status: "Scheduled", lastVisit: "8 Jan 2026" },
  { id: 6, name: "Kathryn Murphy", age: 52, gender: "Female", mrn: "MB-206", blood: "A-", condition: "Thyroid Disorder", status: "Follow-up", lastVisit: "7 Jan 2026" },
  { id: 7, name: "Robert Fox", age: 44, gender: "Male", mrn: "MB-207", blood: "B+", condition: "Back Pain", status: "Active", lastVisit: "6 Jan 2026" },
  { id: 8, name: "Bessie Cooper", age: 58, gender: "Female", mrn: "MB-208", blood: "O+", condition: "Arthritis", status: "Active", lastVisit: "5 Jan 2026" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Active: "text-[hsl(145,60%,38%)] bg-[hsl(145,60%,94%)]",
    Critical: "text-destructive bg-destructive/10",
    "Checked-in": "text-primary bg-primary/10",
    Scheduled: "text-muted-foreground bg-muted",
    "Follow-up": "text-[hsl(35,85%,45%)] bg-[hsl(35,90%,92%)]",
  };
  return (
    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", colors[status] ?? "text-foreground bg-muted")}>
      {status}
    </span>
  );
}

export default function Patients() {
  return (
    <DashboardLayout title="Patients">
      <div className="animate-fade-in space-y-5">
        {/* Breadcrumb */}
        <p className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Patients</Link> / List
        </p>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" /> Add Patient
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-muted-foreground text-xs">
                <th className="text-left px-5 py-3 font-medium">Patient</th>
                <th className="text-left px-4 py-3 font-medium">MRN</th>
                <th className="text-left px-4 py-3 font-medium">Age / Gender</th>
                <th className="text-left px-4 py-3 font-medium">Blood Group</th>
                <th className="text-left px-4 py-3 font-medium">Condition</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Last Visit</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3">
                    <Link to={`/patients/${p.id}`} className="flex items-center gap-3 hover:text-primary">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} />
                        <AvatarFallback>{p.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.mrn}</td>
                  <td className="px-4 py-3 text-foreground">{p.age} / {p.gender}</td>
                  <td className="px-4 py-3 text-foreground">{p.blood}</td>
                  <td className="px-4 py-3 text-foreground">{p.condition}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{p.lastVisit}</td>
                  <td className="px-4 py-3">
                    <Link to={`/patients/${p.id}`} className="text-primary text-xs hover:underline font-medium">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
