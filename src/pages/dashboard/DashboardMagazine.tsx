import { useEffect, useRef, useState } from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { magazineApi, type MagazineIssue } from "@/services/magazine";

export default function DashboardMagazine() {
  const [items, setItems] = useState<MagazineIssue[] | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => magazineApi.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { void load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await magazineApi.create(fd);
      toast({ title: "Magazine issue published" });
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
    if (!window.confirm("Remove this magazine issue?")) return;
    try {
      await magazineApi.remove(id);
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
          <h1 className="font-display text-2xl font-bold">E-Magazine</h1>
          <p className="text-sm text-muted-foreground">Publish institute magazine issues with PDF and cover.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Issue
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-48 rounded-xl" />)
          : items.length === 0
          ? <p className="col-span-full text-center text-muted-foreground py-12">No issues published yet.</p>
          : items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-[3/2] bg-secondary flex items-center justify-center">
                {item.cover_image_url
                  ? <img src={item.cover_image_url} alt={item.title} className="h-full w-full object-cover" />
                  : <BookOpen className="h-10 w-10 text-muted-foreground/30" />}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.volume && `Vol ${item.volume}`}{item.issue_number && ` · Issue ${item.issue_number}`}
                  {item.published_date && ` · ${new Date(item.published_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`}
                </p>
                <Button size="sm" variant="ghost" className="text-destructive mt-2 -ml-2" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Publish Magazine Issue</DialogTitle></DialogHeader>
          <form ref={formRef} onSubmit={handleCreate} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. ZRTI E-Magazine Issue 3" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Input id="volume" name="volume" placeholder="e.g. 1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issue_number">Issue Number</Label>
                <Input id="issue_number" name="issue_number" placeholder="e.g. 3" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="published_date">Published Date</Label>
              <Input id="published_date" name="published_date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf">PDF File</Label>
              <Input id="pdf" name="pdf" type="file" accept=".pdf" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover">Cover Image (optional)</Label>
              <Input id="cover" name="cover" type="file" accept="image/*" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Uploading..." : "Publish"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
