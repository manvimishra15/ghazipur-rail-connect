import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, UserCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { facultyApi, type Faculty } from "@/services/faculty";

export default function DashboardFaculty() {
  const [items, setItems] = useState<Faculty[] | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => facultyApi.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { void load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await facultyApi.create(fd);
      toast({ title: "Faculty added" });
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
    if (!window.confirm("Remove this faculty member?")) return;
    try {
      await facultyApi.remove(id);
      toast({ title: "Removed" });
      void load();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Faculty & Staff</h1>
          <p className="text-sm text-muted-foreground">Manage faculty profiles and designations.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Member
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null
          ? Array.from({ length: 6 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-40 rounded-xl" />)
          : items.length === 0
          ? <p className="col-span-full text-center text-muted-foreground py-12">No faculty records yet.</p>
          : items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-start gap-3 p-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                  {item.photo_url
                    ? <img src={item.photo_url} alt={item.name} className="h-full w-full object-cover" />
                    : <UserCircle className="h-8 w-8 text-primary/40" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  <p className="text-xs text-primary">{item.designation}</p>
                  {item.department && <Badge variant="secondary" className="mt-1 text-xs">{item.department}</Badge>}
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
          <DialogHeader><DialogTitle>Add Faculty Member</DialogTitle></DialogHeader>
          <form ref={formRef} onSubmit={handleCreate} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required placeholder="e.g. Shri Ramesh Kumar" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input id="designation" name="designation" required placeholder="e.g. Principal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" placeholder="e.g. Traction" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input id="qualification" name="qualification" placeholder="e.g. B.Tech (EE)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" name="experience" placeholder="e.g. 15 Years" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="official email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="contact number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Display Order</Label>
                <Input id="sort_order" name="sort_order" type="number" defaultValue={0} min={0} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo (optional)</Label>
              <Input id="photo" name="photo" type="file" accept="image/*" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Add Member"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
