import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { traineeSections } from "@/data/mock";

export default function TraineesInformation() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Trainees Information</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Trainees Information</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Clear access points for class schedule, examination information and result publication.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-4 md:grid-cols-3">
          {traineeSections.map((section) => (
            <Card key={section.title} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{section.description}</p>
                <div className="mt-5 text-xs uppercase tracking-wider text-primary">{section.href}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
