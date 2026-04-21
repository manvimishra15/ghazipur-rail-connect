import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { knowledgeCentreCategories } from "@/data/mock";

export default function KnowledgeCentre() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Knowledge Centre</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Knowledge Centre</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Category-based access to reference material, manuals, circulars and departmental knowledge resources.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {knowledgeCentreCategories.map((category) => (
            <Card key={category.title} className="h-full transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="p-6">
                <SectionHeading title={category.title} />
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {category.items.map((item) => (
                    <li key={item} className="rounded-lg bg-secondary/50 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
