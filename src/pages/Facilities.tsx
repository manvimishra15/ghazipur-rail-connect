import { Dumbbell, MonitorPlay, Projector, Trophy, UtensilsCrossed, BedDouble, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/SectionHeading";
import { facilities } from "@/data/mock";

const icons = [MonitorPlay, Projector, BedDouble, UtensilsCrossed, Dumbbell, Users, Trophy];

export default function Facilities() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Facilities</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Campus Facilities</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Clean card-based presentation of the institute facilities available for training and residential support.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading title="Available Facilities" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {facilities.map((facility, index) => {
            const Icon = icons[index];
            return (
              <Card key={facility.title} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold">{facility.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
