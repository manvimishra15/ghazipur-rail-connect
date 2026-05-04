import { useEffect, useRef, useState } from "react";
import { BookOpen, Plus, Trash2 } from "lucide-react";
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
import { ebooksApi, type Ebook } from "@/services/ebooks";

export default function DashboardEbooks() {
  const [items, setItems] = useState<Ebook[] | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => ebooksApi.list().then(setItems).catch(() => setItems([]));
  useEffect(() => { void load(); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await ebooksApi.create(fd);
      toast({ title: "E-Book added" });
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
    if (!window.confirm("Remove this e-book?")) return;
    try {
      await ebooksApi.remove(id);
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
          <h1 className="font-display text-2xl font-bold">E-Books & Study Material</h1>
          <p className="text-sm text-muted-foreground">Upload rule books, manuals and study materials.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add E-Book
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items === null
          ? Array.from({ length: 6 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-36 rounded-xl" />)
          : items.length === 0
          ? <p className="col-span-full text-center text-muted-foreground py-12">No e-books yet.</p>
          : items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <Button size="icon" variant="ghost" className="text-destructive -mt-1 -mr-1" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="mt-2 font-semibold leading-snug line-clamp-2">{item.title}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  <Badge variant="secondary" className="text-xs">{item.language}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.download_count} downloads</p>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add E-Book</DialogTitle></DialogHeader>
          <form ref={formRef} onSubmit={handleCreate} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. General Rules 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="Operating">
                  <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Operating", "Commercial", "Safety", "Traction", "Signal", "Establishment", "Misc"].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select name="language" defaultValue="English">
                  <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">PDF File</Label>
              <Input id="file" name="file" type="file" accept=".pdf" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail (optional)</Label>
              <Input id="thumbnail" name="thumbnail" type="file" accept="image/*" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Uploading..." : "Add E-Book"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
