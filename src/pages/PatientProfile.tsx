import DashboardLayout from "@/components/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const vitalData = [
  { time: "01.05", value: 85 },
  { time: "02.05", value: 90 },
  { time: "03.05", value: 78 },
  { time: "04.05", value: 95 },
  { time: "05.05", value: 82 },
  { time: "06.05", value: 110 },
  { time: "07.05", value: 88 },
  { time: "08.05", value: 92 },
  { time: "09.05", value: 85 },
  { time: "10.05", value: 100 },
  { time: "11.05", value: 95 },
  { time: "12.05", value: 105 },
  { time: "13.05", value: 98 },
];

const tabs = ["Overview", "Encounters", "Medical History", "Labs", "Medications"];

const diagnoses = [
  { name: "Acute Gastritis", icd: "K29.70", type: "Provisional", severity: "Moderate", status: "Active" },
  { name: "Chest Pain", icd: "R07.9", type: "Ruled Out", severity: "-", status: "Resolved" },
  { name: "Low Back Pain", icd: "M54.5", type: "History", severity: "Mild", status: "Inactive" },
  { name: "Gastroesophageal Reflux Disease (GERD)", icd: "K21.9", type: "Differential", severity: "Mild", status: "Active" },
  { name: "Iron Deficiency Anemia", icd: "D50.9", type: "Suspected", severity: "Moderate", status: "Under Evaluation" },
];

const illnessHistory = [
  { complain: "Stomach pain", duration: "3 days", remarks: "Burning epigastric pain for the past 3 days" },
  { complain: "Vomiting", duration: "1 days", remarks: "Non-bilious, non-projectile vomiting for 1 day. Two episodes reported." },
  { complain: "Blood in stool", duration: "5 day", remarks: "Intermittent passage of dark-colored stools for 5 days. No fresh bleeding." },
];

const medications = [
  { name: "Dolo 650", route: "Tablet", dosage: "1-0-1", duration: "3 days", instruction: "After food" },
  { name: "Doxycycline", route: "Capsule", dosage: "0-0-1", duration: "2 days", instruction: "After food" },
  { name: "Narcan", route: "Injection", dosage: "SOS", duration: "-", instruction: "Emergency use" },
  { name: "Ozempic", route: "Injection", dosage: "Weekly", duration: "-", instruction: "As directed" },
];

const patientData: Record<number, { name: string; age: number; gender: string; mrn: string; blood: string; encounter: string; date: string; time: string }> = {
  1: { name: "Darlene Robertson", age: 41, gender: "Female", mrn: "MB-204", blood: "O+", encounter: "OPD Visit", date: "11 Jan 2026", time: "10:00 AM" },
  2: { name: "Marvin McKinney", age: 55, gender: "Male", mrn: "MB-201", blood: "A+", encounter: "Emergency", date: "10 Jan 2026", time: "9:30 AM" },
  3: { name: "Floyd Miles", age: 48, gender: "Male", mrn: "MB-202", blood: "B-", encounter: "OPD Visit", date: "10 Jan 2026", time: "9:45 AM" },
  4: { name: "Jerome Bell", age: 63, gender: "Male", mrn: "MB-203", blood: "AB+", encounter: "OPD Visit", date: "9 Jan 2026", time: "10:00 AM" },
  5: { name: "Annette Black", age: 37, gender: "Female", mrn: "MB-205", blood: "O-", encounter: "OPD Visit", date: "8 Jan 2026", time: "10:10 AM" },
};

function SeverityBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    Active: "text-[hsl(145,60%,38%)] bg-[hsl(145,60%,94%)]",
    Resolved: "text-muted-foreground bg-muted",
    Inactive: "text-muted-foreground bg-muted",
    "Under Evaluation": "text-[hsl(35,85%,45%)] bg-[hsl(35,90%,92%)]",
  };
  return <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", map[s] ?? "text-foreground bg-muted")}>{s}</span>;
}

export default function PatientProfile() {
  const { id } = useParams();
  const patientId = Number(id) || 1;
  const patient = patientData[patientId] ?? patientData[1];
  const [activeTab, setActiveTab] = useState("Encounters");

  return (
    <DashboardLayout title="Patients">
      <div className="animate-fade-in space-y-4">
        {/* Breadcrumb */}
        <p className="text-sm text-muted-foreground">
          <Link to="/patients" className="hover:text-foreground">Patients</Link> / Profile
        </p>

        {/* Profile Header */}
        <div className="bg-card rounded-xl shadow-card p-5">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Patient Profile</h2>
            <span className="px-3 py-1 bg-[hsl(35,90%,92%)] text-[hsl(35,85%,45%)] text-xs font-semibold rounded-full">Follow-up</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
              <AvatarFallback>{patient.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
              <span className="font-semibold text-foreground text-base">{patient.name}</span>
              <span>{patient.age}</span>
              <span>{patient.gender}</span>
              <span className="text-foreground">MRN: {patient.mrn}</span>
              <span>Blood Group: {patient.blood}</span>
              <span>Encounter: {patient.encounter}</span>
              <span>Date: {patient.date}</span>
              <span>Time: {patient.time}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left - Vitals + Diagnosis Forms */}
          <div className="col-span-2 space-y-4">
            {/* Vitals */}
            <div className="bg-card rounded-xl shadow-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Vitals</h3>
              <div className="flex gap-4 mb-4">
                <div className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-center">
                  <p className="text-xs opacity-80">Heart Rate</p>
                  <p className="text-2xl font-bold">82 <span className="text-xs font-normal">bpm</span></p>
                </div>
                {[
                  { label: "BP-Diastolic", value: "140", unit: "mm/hg" },
                  { label: "Glucose", value: "120", unit: "mg/dl" },
                  { label: "Respiratory Rate", value: "46", unit: "min" },
                  { label: "Blood Pressure", value: "120", unit: "mm/hg" },
                  { label: "Temperature", value: "98.6", unit: "°F" },
                ].map((v) => (
                  <div key={v.label} className="text-center">
                    <p className="text-xs text-muted-foreground">{v.label}</p>
                    <p className="text-lg font-bold text-foreground">↑{v.value} <span className="text-xs font-normal text-muted-foreground">{v.unit}</span></p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={vitalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,90%)" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(220,10%,55%)" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(220,10%,55%)" }} domain={[20, 140]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(185,60%,45%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Encounter Diagnosis */}
            <div className="bg-card rounded-xl shadow-card p-5">
              <h3 className="font-semibold text-foreground mb-4">Encounter Diagnosis</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b border-border">
                    <th className="text-left pb-2 font-medium">Diagnosis</th>
                    <th className="text-left pb-2 font-medium">ICD-10</th>
                    <th className="text-left pb-2 font-medium">Type</th>
                    <th className="text-left pb-2 font-medium">Severity</th>
                    <th className="text-left pb-2 font-medium">Status</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {diagnoses.map((d, i) => (
                    <tr key={i}>
                      <td className="py-2 font-medium text-foreground text-xs">{d.name}</td>
                      <td className="py-2 text-muted-foreground text-xs">{d.icd}</td>
                      <td className="py-2 text-xs">
                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium",
                          d.type === "Provisional" ? "bg-primary/10 text-primary" :
                          d.type === "Ruled Out" ? "bg-muted text-muted-foreground" :
                          "bg-muted text-muted-foreground"
                        )}>{d.type}</span>
                      </td>
                      <td className="py-2 text-xs text-foreground">{d.severity}</td>
                      <td className="py-2"><SeverityBadge s={d.status} /></td>
                      <td className="py-2 text-muted-foreground text-xs">×</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right - Diagnosis Viewer + History + Medication */}
          <div className="space-y-4">
            {/* Diagnosis */}
            <div className="bg-card rounded-xl shadow-card p-5">
              <h3 className="font-semibold text-foreground mb-3">Diagnosis</h3>
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                <p className="text-muted-foreground text-sm">Anatomy Viewer</p>
              </div>
            </div>

            {/* History of Present Illness */}
            <div className="bg-card rounded-xl shadow-card p-5">
              <h3 className="font-semibold text-foreground mb-3">History of Present Illness</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left pb-2 font-medium">Complain</th>
                    <th className="text-left pb-2 font-medium">Duration</th>
                    <th className="text-left pb-2 font-medium">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {illnessHistory.map((h, i) => (
                    <tr key={i}>
                      <td className="py-2 font-medium text-foreground">{h.complain}</td>
                      <td className="py-2 text-muted-foreground">{h.duration}</td>
                      <td className="py-2 text-muted-foreground leading-relaxed">{h.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Medication */}
            <div className="bg-card rounded-xl shadow-card p-5">
              <h3 className="font-semibold text-foreground mb-3">Medication</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left pb-2 font-medium">Name</th>
                    <th className="text-left pb-2 font-medium">Route</th>
                    <th className="text-left pb-2 font-medium">Dosage</th>
                    <th className="text-left pb-2 font-medium">Duration</th>
                    <th className="pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {medications.map((m, i) => (
                    <tr key={i}>
                      <td className="py-2 font-medium text-foreground">{m.name}</td>
                      <td className="py-2 text-muted-foreground">{m.route}</td>
                      <td className="py-2 text-foreground">{m.dosage}</td>
                      <td className="py-2 text-muted-foreground">{m.duration}</td>
                      <td className="py-2 text-muted-foreground">×</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
