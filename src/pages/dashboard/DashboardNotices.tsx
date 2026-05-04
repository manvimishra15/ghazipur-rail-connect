import { useEffect, useRef, useState } from "react";
import { Bell, Plus, Trash2 } from "lucide-react";
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
import { noticesApi, type Notice } from "@/services/notices";

const categoryColor: Record<string, string> = {
  general: "bg-blue-100 text-blue-700",
  circular: "bg-purple-100 text-purple-700",
  tender: "bg-orange-100 text-orange-700",
  rti: "bg-green-100 text-green-700",
};

export default function DashboardNotices() {
  const [items, setItems] = useState<Notice[] | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => noticesApi.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { void load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await noticesApi.create(fd);
      toast({ title: "Notice published" });
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
    if (!window.confirm("Remove this notice?")) return;
    try {
      await noticesApi.remove(id);
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
          <h1 className="font-display text-2xl font-bold">Notices & Circulars</h1>
          <p className="text-sm text-muted-foreground">Publish official notices, tenders and RTI information.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Notice
        </Button>
      </div>

      <div className="space-y-3">
        {items === null
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-16 rounded-xl" />)
          : items.length === 0
          ? <p className="text-center text-muted-foreground py-12">No notices yet.</p>
          : items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-start justify-between gap-4 p-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge className={`text-xs border-0 ${categoryColor[item.category] ?? "bg-secondary"}`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString("en-IN")}
                      </span>
                    </div>
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
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Notice</DialogTitle></DialogHeader>
          <form ref={formRef} onSubmit={handleCreate} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="Notice title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (optional)</Label>
              <Textarea id="content" name="content" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" defaultValue="general">
                <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["general", "circular", "tender", "rti"].map((c) => (
                    <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment (optional)</Label>
              <Input id="attachment" name="attachment" type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Publish"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
