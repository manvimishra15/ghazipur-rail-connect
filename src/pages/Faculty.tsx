import { useEffect, useState } from "react";
import { Mail, Phone, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { facultyApi, type Faculty } from "@/services/faculty";

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[] | null>(null);

  useEffect(() => {
    facultyApi.list().then(setFaculty).catch(() => setFaculty([]));
  }, []);

  const principal = faculty?.find((f) => f.designation.toLowerCase().includes("principal"));
  const rest = faculty?.filter((f) => !f.designation.toLowerCase().includes("principal"));

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our Team</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Faculty & Staff</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Meet the experienced faculty and staff who make ZRTI Ghazipur a centre of railway training excellence.
          </p>
        </div>
      </section>

      {/* Principal card */}
      {(faculty === null || principal) && (
        <section className="container-page pt-12">
          <SectionHeading eyebrow="Leadership" title="Principal" />
          <div className="mt-6">
            {faculty === null ? (
              <Skeleton className="h-40 rounded-xl max-w-lg" />
            ) : principal ? (
              <FacultyCard member={principal} large />
            ) : null}
          </div>
        </section>
      )}

      <section className="container-page section-y">
        <SectionHeading eyebrow="Faculty & Staff" title="Instructors & Support Staff" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {faculty === null
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)
            : (rest ?? []).length === 0
            ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Users className="h-12 w-12 mb-3 opacity-30" />
                <p>No faculty records yet.</p>
              </div>
            )
            : (rest ?? []).map((member) => <FacultyCard key={member.id} member={member} />)}
        </div>
      </section>
    </>
  );
}

function FacultyCard({ member, large = false }: { member: Faculty; large?: boolean }) {
  return (
    <Card className={`transition-all hover:-translate-y-0.5 hover:shadow-elegant ${large ? "max-w-lg" : ""}`}>
      <CardContent className={`p-6 ${large ? "flex gap-6 items-center" : ""}`}>
        <div className={`${large ? "h-24 w-24 flex-shrink-0" : "h-16 w-16 mx-auto"} overflow-hidden rounded-full bg-primary/10 flex items-center justify-center`}>
          {member.photo_url ? (
            <img src={member.photo_url} alt={member.name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-xl font-bold text-primary">
              {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </span>
          )}
        </div>
        <div className={large ? "" : "mt-4 text-center"}>
          <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
          <p className="text-sm text-primary font-medium mt-0.5">{member.designation}</p>
          {member.department && (
            <Badge variant="secondary" className="mt-2 text-xs">{member.department}</Badge>
          )}
          <div className="mt-3 space-y-1">
            {member.qualification && (
              <p className="text-xs text-muted-foreground">{member.qualification}</p>
            )}
            {member.experience && (
              <p className="text-xs text-muted-foreground">Experience: {member.experience}</p>
            )}
          </div>
          {(member.email || member.phone) && (
            <div className={`mt-3 space-y-1 ${large ? "" : "text-left"}`}>
              {member.email && (
                <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
                  <Mail className="h-3 w-3" /> {member.email}
                </a>
              )}
              {member.phone && (
                <a href={`tel:${member.phone}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
                  <Phone className="h-3 w-3" /> {member.phone}
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
