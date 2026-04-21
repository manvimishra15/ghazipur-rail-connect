import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Announcement } from "@/data/mock";

const categoryStyles: Record<Announcement["category"], string> = {
  News: "bg-secondary text-secondary-foreground",
  Event: "border border-accent/30 bg-accent/15 text-accent-foreground",
  Notice: "border border-primary/20 bg-primary/10 text-primary",
  Visit: "border border-success/30 bg-success/10 text-success",
};

export function AnnouncementCard({ a, highlight = false }: { a: Announcement; highlight?: boolean }) {
  const date = new Date(a.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card
      className={`group relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-elegant ${
        highlight ? "border-accent/60" : ""
      }`}
    >
      {highlight && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
          Latest
        </span>
      )}
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={a.date}>{date}</time>
          <Badge variant="outline" className={`ml-auto ${categoryStyles[a.category]}`}>
            {a.category}
          </Badge>
        </div>
        <h3 className="mt-3 font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {a.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
        <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2">
          Read more <ArrowRight className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
