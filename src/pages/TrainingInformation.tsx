import { useEffect, useState } from "react";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { coursesApi, type Course } from "@/services/courses";
import { trainingSections } from "@/data/mock";

const statusColor: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-secondary text-muted-foreground",
};

export default function TrainingInformation() {
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    coursesApi.list().then(setCourses).catch(() => setCourses([]));
  }, []);

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Training Information</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Training Information</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Training calendar, forthcoming courses, videos and webinar content for railway personnel.
          </p>
        </div>
      </section>

      {/* Live Courses from API */}
      <section className="container-page section-y">
        <SectionHeading eyebrow="Forthcoming Courses" title="Upcoming & Ongoing Training Batches" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {courses === null
            ? Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-44 rounded-xl" />)
            : courses.length === 0
            ? <p className="text-muted-foreground col-span-full text-center py-8">No courses scheduled at this time.</p>
            : courses.map((course) => (
              <Card key={course.id} className="transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <Badge className={`text-xs border-0 ${statusColor[course.status] ?? ""}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </Badge>
                    {course.category && <Badge variant="outline" className="text-xs">{course.category}</Badge>}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{course.title}</h3>
                  {course.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{course.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    {course.duration && (
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                    )}
                    {course.start_date && (
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(course.start_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        {course.end_date && ` – ${new Date(course.end_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}`}
                      </span>
                    )}
                    {course.seats > 0 && (
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.seats} seats</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Static sections (videos, webinars, calendar) */}
      <section className="border-t border-border bg-secondary/50">
        <div className="container-page section-y space-y-10">
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
        </div>
      </section>
    </>
  );
}
