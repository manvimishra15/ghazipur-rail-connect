import { useEffect, useState } from "react";
import { Bell, Download, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { noticesApi, type Notice } from "@/services/notices";

const CATEGORIES = ["all", "general", "circular", "tender", "rti"] as const;

const categoryLabel: Record<string, string> = {
  all: "All Notices",
  general: "General",
  circular: "Circular",
  tender: "Tender",
  rti: "RTI",
};

const categoryColor: Record<string, string> = {
  general: "bg-blue-100 text-blue-700",
  circular: "bg-purple-100 text-purple-700",
  tender: "bg-orange-100 text-orange-700",
  rti: "bg-green-100 text-green-700",
};

export default function Notices() {
  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    const params = category !== "all" ? { category } : undefined;
    setNotices(null);
    noticesApi.list(params).then(setNotices).catch(() => setNotices([]));
  }, [category]);

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Official Notices</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Notices & Circulars</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Official notices, circulars, tender notifications and RTI information from the institute.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <SectionHeading title="Latest Notices" />
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
                className="text-xs"
              >
                {categoryLabel[cat]}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {notices === null
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
            : notices.length === 0
            ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-xl border border-dashed border-border">
                <Bell className="h-12 w-12 mb-3 opacity-30" />
                <p>No notices found.</p>
              </div>
            )
            : notices.map((notice) => (
              <Card key={notice.id} className="transition-all hover:shadow-card">
                <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{notice.title}</h3>
                      {notice.content && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{notice.content}</p>}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(notice.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge className={`text-xs border-0 ${categoryColor[notice.category] ?? "bg-secondary text-foreground"}`}>
                      {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                    </Badge>
                    {notice.attachment_url && (
                      <Button asChild size="sm" variant="outline">
                        <a href={notice.attachment_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-3.5 w-3.5 mr-1" /> View
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
    </>
  );
}
