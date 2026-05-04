import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Route } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { howToReach, siteMeta } from "@/data/mock";

const contactCards = [
  { icon: MapPin, title: "Address", lines: siteMeta.addressLines },
  { icon: Phone, title: "Phone", lines: [siteMeta.phone] },
  { icon: Mail, title: "Email", lines: [siteMeta.email] },
];

export default function Contact() {
  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Institute Contact Details</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Official address, communication details, map location and travel guidance for ZRTI Ghazipur.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-4 md:grid-cols-3">
          {contactCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden">
            <iframe
              title="Map of Zonal Railway Training Institute Ghazipur"
              src="https://www.google.com/maps?q=Mahuabagh,+Ghazipur,+Uttar+Pradesh&output=embed"
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>

          <Card>
            <CardContent className="p-6">
              <SectionHeading eyebrow="How To Reach" title="Travel guidance" />
              <div className="mt-6 space-y-4">
                {howToReach.map((item) => (
                  <div key={item.mode} className="rounded-lg border border-border bg-secondary/40 p-4">
                    <div className="flex items-center gap-2 font-display font-semibold text-foreground">
                      <Route className="h-4 w-4 text-primary" />
                      {item.mode}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
