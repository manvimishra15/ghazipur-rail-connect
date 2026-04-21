import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { magazineIssues } from "@/data/mock";

export default function EMagazine() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">E-Magazine</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Institute E-Magazine</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Placeholder magazine cards for institute publications and downloadable issue archives.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading
          title="Magazine Issues"
          description="Each card is prepared so file URLs can later be sourced from a document endpoint or CMS."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {magazineIssues.map((issue) => (
            <Card key={issue.id} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="p-6">
                <div className="text-xs uppercase tracking-wider text-primary">{issue.period}</div>
                <h2 className="mt-2 font-display text-xl font-semibold">{issue.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{issue.description}</p>
                <div className="mt-5 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {issue.fileLabel}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
