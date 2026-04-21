import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <div className="font-display text-8xl text-primary tracking-widest">404</div>
        <div className="font-condensed uppercase tracking-widest text-muted-foreground">Page not found</div>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90 font-condensed uppercase tracking-widest">Back home</Button>
        </Link>
      </div>
    </div>
  );
}
