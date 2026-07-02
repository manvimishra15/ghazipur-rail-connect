import { useEffect, useState } from "react";
import { Images, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SectionHeading } from "@/components/SectionHeading";
import { galleryApi, type GalleryAlbum } from "@/services/gallery";

export default function Gallery() {
  const [albums, setAlbums] = useState<GalleryAlbum[] | null>(null);
  const [selected, setSelected] = useState<GalleryAlbum | null>(null);
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    galleryApi.listAlbums().then(setAlbums).catch(() => setAlbums([]));
  }, []);

  const openAlbum = async (album: GalleryAlbum) => {
    setLoadingAlbum(true);
    try {
      const full = await galleryApi.getAlbum(album.id);
      setSelected(full);
    } finally {
      setLoadingAlbum(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container-page py-12 md:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Gallery</span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">Photo Gallery</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Explore our campus, training sessions, events and memorable moments through photographs.
          </p>
        </div>
      </section>

      <section className="container-page section-y">
        <SectionHeading eyebrow="Albums" title="Campus & Events" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!albums
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)
            : albums.length === 0
            ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Images className="h-12 w-12 mb-3 opacity-30" />
                <p>No albums yet.</p>
              </div>
            )
            : albums.map((album) => (
              <Card
                key={album.id}
                className="cursor-pointer overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                onClick={() => openAlbum(album)}
              >
                <div className="relative aspect-video bg-secondary">
                  {album.cover_image ? (
                    <img src={album.cover_image} alt={album.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                  )}
                  <Badge className="absolute bottom-2 right-2 bg-black/60 text-white border-0">
                    {album.image_count} photo{album.image_count !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold">{album.title}</h3>
                  {album.description && <p className="mt-1 text-sm text-muted-foreground">{album.description}</p>}
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Album Dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-4xl w-full">
          {loadingAlbum ? (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded-lg" />)}
            </div>
          ) : selected ? (
            <div>
              <h2 className="font-display text-xl font-bold mb-4">{selected.title}</h2>
              {!selected.images || selected.images.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No images in this album yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto pr-1">
                  {selected.images.map((img) => (
                    <div
                      key={img.id}
                      className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-secondary"
                      onClick={() => setLightboxImg(img.image_url)}
                    >
                      <img src={img.image_url} alt={img.caption || ""} className="h-full w-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      <Dialog open={!!lightboxImg} onOpenChange={(open) => !open && setLightboxImg(null)}>
        <DialogContent className="max-w-5xl w-full bg-black/95 border-0 p-2">
          {lightboxImg && (
            <img src={lightboxImg} alt="" className="max-h-[85vh] w-full object-contain rounded" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
