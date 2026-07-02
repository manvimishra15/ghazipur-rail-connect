import { useEffect, useRef, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { resultsApi, type Result } from "@/services/results";

export default function DashboardResults() {
  const [items, setItems] = useState<Result[] | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => resultsApi.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { void load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await resultsApi.create(fd);
      toast({ title: "Result published" });
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
    if (!window.confirm("Remove this result?")) return;
    try {
      await resultsApi.remove(id);
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
          <h1 className="font-display text-2xl font-bold">Results</h1>
          <p className="text-sm text-muted-foreground">Publish result PDFs for completed training batches.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Publish Result
        </Button>
      </div>

      <div className="space-y-3">
        {items === null
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-16 rounded-xl" />)
          : items.length === 0
          ? <p className="text-center text-muted-foreground py-12">No results published yet.</p>
          : items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{item.course_name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.batch} · {new Date(item.published_at).toLocaleDateString("en-IN")}
                    </p>
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
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Publish Result</DialogTitle></DialogHeader>
          <form ref={formRef} onSubmit={handleCreate} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="course_name">Course Name</Label>
              <Input id="course_name" name="course_name" required placeholder="e.g. OHE Maintenance Batch" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Input id="batch" name="batch" required placeholder="e.g. Batch-2025-A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam_date">Exam Date</Label>
              <Input id="exam_date" name="exam_date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="result_pdf">Result PDF</Label>
              <Input id="result_pdf" name="result_pdf" type="file" accept=".pdf" required />
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
