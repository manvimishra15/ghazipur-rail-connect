import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { coursesApi, type Course } from "@/services/courses";

const statusColor: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-secondary text-muted-foreground",
};

export default function DashboardCourses() {
  const [items, setItems] = useState<Course[] | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => coursesApi.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { void load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setSubmitting(true);
    try {
      await coursesApi.create({ ...payload, seats: Number(payload.seats) } as Partial<Course>);
      toast({ title: "Course created" });
      setOpen(false);
      formRef.current?.reset();
      void load();
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await coursesApi.remove(id);
      toast({ title: "Deleted" });
      void load();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Courses</h1>
          <p className="text-sm text-muted-foreground">Manage training courses and batch schedules.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Course
        </Button>
      </div>

      <div className="space-y-3">
        {items === null
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-20 rounded-xl" />)
          : items.length === 0
          ? <p className="text-center text-muted-foreground py-12">No courses yet.</p>
          : items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <Badge className={`text-xs border-0 ${statusColor[item.status] ?? ""}`}>{item.status}</Badge>
                    {item.category && <Badge variant="outline" className="text-xs">{item.category}</Badge>}
                    {item.duration && <span className="text-xs text-muted-foreground">{item.duration}</span>}
                    {item.start_date && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.start_date).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="text-destructive shrink-0" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Course</DialogTitle>
          </DialogHeader>
          <form ref={formRef} onSubmit={handleCreate} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input id="title" name="title" required placeholder="e.g. OHE Maintenance & Inspection" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} placeholder="Brief course description..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="Traction">
                  <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Traction", "Signal", "Safety", "Commercial", "Operating", "Administration"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="upcoming">
                  <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" placeholder="e.g. 21 Days" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seats">Seats</Label>
                <Input id="seats" name="seats" type="number" min={0} defaultValue={30} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input id="start_date" name="start_date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input id="end_date" name="end_date" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
