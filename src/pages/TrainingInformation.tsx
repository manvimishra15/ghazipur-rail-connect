import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { trainingSections } from "@/data/mock";

export default function TrainingInformation() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Training Information</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Training Information</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Structured access to training calendar items, forthcoming courses, videos and webinar content.
          </p>
        </div>
      </section>

      <section className="container-page section-y space-y-10">
        {trainingSections.map((section) => (
          <div key={section.title}>
            <SectionHeading title={section.title} />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {section.items.map((item) => (
                <Card key={item.id} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-4 text-xs uppercase tracking-wider text-primary">{item.meta}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
