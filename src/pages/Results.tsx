import { useEffect, useState } from "react";
import { Download, FileText, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { resultsApi, type Result } from "@/services/results";

export default function Results() {
  const [results, setResults] = useState<Result[] | null>(null);

  useEffect(() => {
    resultsApi.list().then(setResults).catch(() => setResults([]));
  }, []);

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Results</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Training Results</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Course-wise results for completed training batches. Download result PDFs for reference.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading eyebrow="Published Results" title="Batch-wise Training Results" />
        <div className="mt-8 space-y-3">
          {results === null
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
            : results.length === 0
            ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground rounded-xl border border-dashed border-border">
                <Trophy className="h-12 w-12 mb-3 opacity-30" />
                <p>No results published yet.</p>
              </div>
            )
            : results.map((result) => (
              <Card key={result.id} className="transition-all hover:shadow-card">
                <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{result.course_name}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">Batch: {result.batch}</p>
                      {result.exam_date && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Exam date: {new Date(result.exam_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="secondary" className="text-xs">
                      {new Date(result.published_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </Badge>
                    {result.result_pdf_url && (
                      <Button asChild size="sm" variant="outline">
                        <a href={result.result_pdf_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-3.5 w-3.5 mr-1" /> Download
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
