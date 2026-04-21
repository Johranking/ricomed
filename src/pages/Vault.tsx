import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Flame, Crown } from "lucide-react";

export default function Vault() {
  return (
    <AppLayout>
      <div className="px-4 py-5 space-y-8 animate-slide-up">
        <div className="relative overflow-hidden bg-gradient-dark border border-border p-6">
          <div className="absolute top-0 right-0 bg-primary px-3 py-1">
            <Lock className="w-3 h-3 text-primary-foreground inline mr-1" />
            <span className="text-[9px] tracking-[0.3em] font-bold text-primary-foreground">CLASSIFIED</span>
          </div>
          <div className="text-xs text-primary tracking-[0.4em] font-bold mb-2 mt-3">24/7</div>
          <h1 className="font-display text-6xl tracking-wider leading-none">THE<br/>VAULT</h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            A space where discipline becomes identity. Where reps build the man you said you'd become. No shortcuts. No compromise.
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-primary tracking-[0.4em] font-bold">IDENTITY</div>
          <h2 className="font-display text-4xl tracking-wider leading-none">WHO YOU ARE<br/>WHEN<br/>NO ONE WATCHES</h2>
        </div>

        <div className="space-y-3">
          {[
            { icon: Shield, title: "Discipline", text: "Show up. Even when motivation dies. Especially then." },
            { icon: Flame, title: "Intensity", text: "Every set is a statement. Every rep, evidence." },
            { icon: Crown, title: "Sovereignty", text: "Your body. Your mind. Your standard. Refuse mediocrity." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-card border border-border p-5 flex items-start gap-4">
              <Icon className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <div className="font-condensed uppercase tracking-widest text-base">{title}</div>
                <div className="text-sm text-muted-foreground mt-1">{text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-primary pl-4 py-2">
          <div className="font-display text-2xl tracking-wider leading-tight">
            "IRON KINETIC IS NOT A WORKOUT. IT'S A PHILOSOPHY OF UNRELENTING FORWARD MOTION."
          </div>
        </div>

        <Link to="/week" className="block">
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 font-condensed uppercase tracking-widest text-lg">
            <Lock className="w-5 h-5 mr-2" /> Enter the Vault
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}
