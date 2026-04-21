import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, GraduationCap } from "lucide-react";
import type { Course } from "@/data/mock";
import { Button } from "@/components/ui/button";

export function CourseCard({ c }: { c: Course }) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant">
      <div className="h-1.5 bg-gradient-band" />
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
            {c.category}
          </Badge>
          <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase tracking-wider">
            {c.level}
          </Badge>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {c.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{c.duration}</span>
          <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />Certificate</span>
        </div>

        <div className="mt-auto pt-5">
          <Button variant="outline" size="sm" className="w-full">View details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
