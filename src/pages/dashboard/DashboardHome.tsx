import { useEffect, useState } from "react";
import { BookOpen, Bell, GraduationCap, Images, Megaphone, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { announcementsApi } from "@/services/announcements";
import { coursesApi } from "@/services/courses";
import { facultyApi } from "@/services/faculty";
import { resultsApi } from "@/services/results";

export default function DashboardHome() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ announcements: 0, courses: 0, faculty: 0, results: 0 });

  useEffect(() => {
    Promise.allSettled([
      announcementsApi.list(),
      coursesApi.list(),
      facultyApi.list(),
      resultsApi.list(),
    ]).then(([a, c, f, r]) => {
      setCounts({
        announcements: a.status === "fulfilled" ? a.value.length : 0,
        courses: c.status === "fulfilled" ? c.value.length : 0,
        faculty: f.status === "fulfilled" ? f.value.length : 0,
        results: r.status === "fulfilled" ? r.value.length : 0,
      });
    });
  }, []);

  if (!user) return null;

  const stats = [
    { label: "Announcements", value: counts.announcements, icon: Megaphone },
    { label: "Courses", value: counts.courses, icon: BookOpen },
    { label: "Faculty Members", value: counts.faculty, icon: Users },
    { label: "Results Published", value: counts.results, icon: GraduationCap },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="text-sm text-muted-foreground">Manage all institute content from this dashboard.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
                <div className="mt-0.5 font-display text-2xl font-bold text-primary">{item.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { icon: Megaphone, title: "Announcements", desc: "Post news, notices and pinned updates visible on the homepage." },
          { icon: BookOpen, title: "Courses", desc: "Manage training courses, batch dates, seats and status." },
          { icon: Images, title: "Gallery", desc: "Create albums and upload photos from campus events and batches." },
          { icon: Users, title: "Faculty", desc: "Add and update faculty profiles with photos and designations." },
          { icon: GraduationCap, title: "Results", desc: "Upload result PDFs for completed training batches." },
          { icon: Bell, title: "Notices", desc: "Publish circulars, tenders and RTI notices." },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{item.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
