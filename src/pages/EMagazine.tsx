import { useEffect, useState } from "react";
import { BookOpen, Download, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { magazineApi, type MagazineIssue } from "@/services/magazine";

export default function EMagazine() {
  const [issues, setIssues] = useState<MagazineIssue[] | null>(null);

  useEffect(() => {
    magazineApi.list().then(setIssues).catch(() => setIssues([]));
  }, []);

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">E-Magazine</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Institute E-Magazine</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Institute publications, training highlights and literary contributions from staff and trainees.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading eyebrow="Publications" title="Magazine Issues & Archives" />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {issues === null && Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-64 rounded-xl" />)}
          {issues !== null && issues.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground rounded-xl border border-dashed border-border">
              <Newspaper className="h-12 w-12 mb-3 opacity-30" />
              <p>No magazine issues published yet.</p>
            </div>
          )}
          {issues !== null && issues.length > 0 && issues.map((issue) => (
              <Card key={issue.id} className="overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="relative aspect-[3/4] max-h-48 bg-secondary flex items-center justify-center">
                  {issue.cover_image_url ? (
                    <img src={issue.cover_image_url} alt={issue.title} className="h-full w-full object-cover" />
                  ) : (
                    <BookOpen className="h-14 w-14 text-muted-foreground/20" />
                  )}
                </div>
                <CardContent className="p-5">
                  {issue.volume && (
                    <div className="text-xs uppercase tracking-wider text-primary mb-1">
                      {issue.volume}{issue.issue_number ? ` · Issue ${issue.issue_number}` : ""}
                    </div>
                  )}
                  <h2 className="font-display text-lg font-semibold leading-snug">{issue.title}</h2>
                  {issue.published_date && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(issue.published_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                    </p>
                  )}
                  {issue.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{issue.description}</p>
                  )}
                  <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                    <a href={issue.pdf_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-3.5 w-3.5 mr-1.5" /> Download PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
          ))}
        </div>
      </section>
    </>
  );
}
