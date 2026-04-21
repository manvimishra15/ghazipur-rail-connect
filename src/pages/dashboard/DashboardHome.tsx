import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { adminHighlights } from "@/data/mock";

export default function DashboardHome() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="text-sm text-muted-foreground">
          This simplified dashboard is ready for future integration of admin features such as news,
          training updates and content publishing workflows.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminHighlights.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</div>
              <div className="mt-2 font-display text-2xl font-bold text-primary">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-semibold">Integration Notes</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>News cards can be connected to <code>/api/news</code>.</li>
            <li>Training information cards can be connected to <code>/api/courses</code>.</li>
            <li>Login flow is prepared for admin authentication via <code>/api/login</code>.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
