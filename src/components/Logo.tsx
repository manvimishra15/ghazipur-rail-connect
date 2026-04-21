import { Train } from "lucide-react";
import { Link } from "react-router-dom";
import { siteMeta } from "@/data/mock";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-md ${
          light ? "bg-white/10 ring-1 ring-white/20" : "bg-primary"
        }`}
      >
        <Train className={`h-6 w-6 ${light ? "text-accent" : "text-primary-foreground"}`} />
      </div>
      <div className="leading-tight">
        <div className={`font-display text-base font-bold ${light ? "text-white" : "text-primary"}`}>
          {siteMeta.shortName}
        </div>
        <div className={`text-[11px] uppercase tracking-wider ${light ? "text-white/70" : "text-muted-foreground"}`}>
          Ghazipur · Ministry of Railways
        </div>
      </div>
    </Link>
  );
}
