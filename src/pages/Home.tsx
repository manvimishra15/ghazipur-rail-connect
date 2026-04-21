import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Contact, Newspaper, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { announcementsApi } from "@/services/announcements";
import type { Announcement } from "@/data/mock";
import { principalMessage, quickLinks, siteMeta } from "@/data/mock";
import heroImg from "@/assets/hero-railway.jpg";

const homeHighlights = [
  { label: "Official Training Portal", value: "Government-ready" },
  { label: "Knowledge Categories", value: "09 sections" },
  { label: "Training Blocks", value: "04 core areas" },
];

export default function Home() {
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null);

  useEffect(() => {
    announcementsApi.latest(3).then(setAnnouncements).catch(() => setAnnouncements([]));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--primary-foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary-foreground)/0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="container-page relative grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              {siteMeta.authority}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {siteMeta.name}
            </h1>
            <p className="mt-4 text-xl text-accent">{siteMeta.subtitle}</p>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/85 md:text-lg">
              A structured digital front door for institute information, training updates, trainee access
              sections and administrative communication.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/training-information">
                  Explore Training <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
              >
                <Link to="/contact">Contact Institute</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in-up">
            <div className="absolute -inset-4 rounded-2xl bg-accent/20 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Railway platform scene representing institute training environment"
              width={1536}
              height={1024}
              className="relative h-auto w-full rounded-xl shadow-elegant ring-1 ring-white/10"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 container-page">
        <div className="grid gap-4 md:grid-cols-3">
          {homeHighlights.map((item) => (
            <Card key={item.label} className="shadow-card">
              <CardContent className="p-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
                <div className="mt-2 font-display text-2xl font-bold text-primary">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-page section-y">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Principal Message" title={principalMessage.title} />
            <p className="mt-4 text-muted-foreground">{principalMessage.body}</p>
            <p className="mt-4 text-sm text-muted-foreground">{principalMessage.note}</p>
            <div className="mt-5 text-sm font-medium text-primary">{principalMessage.name}</div>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="flex min-h-[320px] items-center justify-center bg-secondary/50 p-8">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-primary/30 bg-background text-center text-sm text-muted-foreground">
                Principal
                <br />
                Photo
                <br />
                Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="News & Events"
            title="Latest updates from the institute"
            description="Dummy content is structured as reusable cards and can be connected later to /api/news."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {!announcements
              ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-44 rounded-lg" />)
              : announcements.map((announcement, index) => (
                  <AnnouncementCard key={announcement.id} a={announcement} highlight={index === 0} />
                ))}
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Quick Links"
          title="Important institute access points"
          description="These cards are kept modular so their URLs can be swapped with live endpoints later."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quickLinks.map((link, index) => {
            const Icon = index === 0 ? CalendarDays : index === 1 ? Newspaper : Contact;
            return (
              <Link
                key={link.title}
                to={link.href}
                className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold text-foreground">{link.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{link.description}</div>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
