import { useEffect, useRef, useState } from "react";
import { ImageIcon, Plus, Trash2, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { galleryApi, type GalleryAlbum } from "@/services/gallery";

export default function DashboardGallery() {
  const [albums, setAlbums] = useState<GalleryAlbum[] | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const createRef = useRef<HTMLFormElement>(null);
  const uploadRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const load = () => galleryApi.listAlbums().then(setAlbums).catch(() => setAlbums([]));
  useEffect(() => { void load(); }, []);

  const handleCreateAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await galleryApi.createAlbum(fd);
      toast({ title: "Album created" });
      setCreateOpen(false);
      createRef.current?.reset();
      void load();
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadImages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAlbum) return;
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await galleryApi.addImages(selectedAlbum.id, fd);
      toast({ title: "Images uploaded" });
      setUploadOpen(false);
      uploadRef.current?.reset();
      void load();
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    if (!window.confirm("Delete this album and all its images?")) return;
    try {
      await galleryApi.deleteAlbum(id);
      toast({ title: "Album deleted" });
      void load();
    } catch {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Gallery</h1>
          <p className="text-sm text-muted-foreground">Create albums and upload photos.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Album
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {albums === null
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={`skel-${i}`} className="h-44 rounded-xl" />)
          : albums.length === 0
          ? <p className="col-span-full text-center text-muted-foreground py-12">No albums yet.</p>
          : albums.map((album) => (
            <Card key={album.id} className="overflow-hidden">
              <div className="relative aspect-video bg-secondary flex items-center justify-center">
                {album.cover_image
                  ? <img src={album.cover_image} alt={album.title} className="h-full w-full object-cover" />
                  : <ImageIcon className="h-10 w-10 text-muted-foreground/30" />}
                <Badge className="absolute bottom-2 right-2 bg-black/60 text-white border-0 text-xs">
                  {album.image_count} photos
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{album.title}</h3>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedAlbum(album); setUploadOpen(true); }}>
                    <Upload className="h-3.5 w-3.5 mr-1" /> Upload
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteAlbum(album.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Create Album Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>New Album</DialogTitle></DialogHeader>
          <form ref={createRef} onSubmit={handleCreateAlbum} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Album Title</Label>
              <Input id="title" name="title" required placeholder="e.g. Campus 2025" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover">Cover Image (optional)</Label>
              <Input id="cover" name="cover" type="file" accept="image/*" />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Creating..." : "Create Album"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload Images Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload to: {selectedAlbum?.title}</DialogTitle>
          </DialogHeader>
          <form ref={uploadRef} onSubmit={handleUploadImages} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="images">Select Images</Label>
              <Input id="images" name="images" type="file" accept="image/*" multiple required />
              <p className="text-xs text-muted-foreground">You can select multiple images at once.</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>{submitting ? "Uploading..." : "Upload"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
