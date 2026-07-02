import { Building2, Goal, Landmark, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { siteMeta } from "@/data/mock";
import heroImg from "@/assets/hero-railway.jpg";

const values = [
  {
    icon: Landmark,
    title: "Institute Overview",
    description:
      "ZRTI Ghazipur functions as a structured training centre for railway personnel, supporting systematic capacity building through classroom instruction, guided practice and institutional knowledge support.",
  },
  {
    icon: Target,
    title: "Mission",
    description:
      "To deliver disciplined, relevant and service-oriented railway training that improves professional competence, operational readiness and public service outcomes.",
  },
  {
    icon: Goal,
    title: "Vision",
    description:
      "To be a dependable zonal training institute known for quality learning resources, responsive administration and a strong culture of safety and professionalism.",
  },
  {
    icon: Building2,
    title: "Training Purpose",
    description:
      "The institute supports induction, refresher and specialized training needs across operational, commercial, safety and administrative domains.",
  },
];

export default function About() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-14 md:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">{siteMeta.name}</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">
            A professional and government-style institute website focused on clarity, structure and
            readiness for future content management.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <img
            src={heroImg}
            alt="Railway image representing institute overview"
            loading="lazy"
            width={1536}
            height={1024}
            className="rounded-xl shadow-card"
          />
          <div>
            <SectionHeading eyebrow="Institute Overview" title="Professional training with public service focus" />
            <p className="mt-4 text-muted-foreground">
              The institute exists to support the training requirements of the railway system through
              organized instruction, updated reference material and an environment that encourages continuous
              learning. The site content is now aligned to official sections such as training information,
              knowledge resources, trainee information and institutional contact details.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Mission & Vision"
            title="Core institutional purpose"
            description="Key public-facing institute statements are presented as clean reusable cards."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <Card key={value.title} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
