import DashboardLayout from "@/components/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Send, Search } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Dr. Sarah Connor", role: "Cardiologist", lastMsg: "Please review the ECG report for Marvin.", time: "9:42 AM", unread: 2 },
  { id: 2, name: "Dr. James Wright", role: "Radiologist", lastMsg: "CT scan results are ready.", time: "Yesterday", unread: 0 },
  { id: 3, name: "Nurse Patricia", role: "Head Nurse", lastMsg: "Patient in Room 3 is asking for you.", time: "Yesterday", unread: 1 },
  { id: 4, name: "Dr. Emily Chen", role: "Neurologist", lastMsg: "Can we schedule a consult?", time: "Monday", unread: 0 },
  { id: 5, name: "Lab Team", role: "Laboratory", lastMsg: "HbA1c results uploaded.", time: "Monday", unread: 0 },
];

const messages = [
  { from: "Dr. Sarah Connor", text: "Hey, did you get the ECG results for Marvin McKinney?", time: "9:30 AM", mine: false },
  { from: "Me", text: "Yes, I just reviewed them. There are some abnormalities we need to discuss.", time: "9:35 AM", mine: true },
  { from: "Dr. Sarah Connor", text: "Please review the ECG report for Marvin.", time: "9:42 AM", mine: false },
  { from: "Me", text: "I'll prepare a referral note and send it over shortly.", time: "9:50 AM", mine: true },
];

export default function Messages() {
  const [selected, setSelected] = useState(1);
  const [input, setInput] = useState("");

  return (
    <DashboardLayout title="Messages">
      <div className="animate-fade-in bg-card rounded-xl shadow-card overflow-hidden flex flex-col sm:flex-row h-[calc(100vh-160px)]">
        {/* Sidebar */}
        <div className="w-full sm:w-72 border-b sm:border-b-0 sm:border-r border-border flex flex-col max-h-52 sm:max-h-full overflow-auto sm:overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search messages..." className="pl-9 pr-3 py-2 text-sm bg-background border border-border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)} className={cn("w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left", selected === c.id && "bg-accent")}>
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`} />
                  <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center shrink-0">{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-border flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversations[selected - 1].name}`} />
              <AvatarFallback>{conversations[selected - 1].name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{conversations[selected - 1].name}</p>
              <p className="text-xs text-muted-foreground">{conversations[selected - 1].role}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-sm px-4 py-2.5 rounded-2xl text-sm", m.mine ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm")}>
                  <p>{m.text}</p>
                  <p className={cn("text-[10px] mt-1", m.mine ? "text-primary-foreground/70" : "text-muted-foreground")}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-border flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
