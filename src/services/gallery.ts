import { api } from "./api";

export type GalleryImage = {
  id: number;
  album_id: number;
  image_url: string;
  caption: string | null;
  created_at: string;
};

export type GalleryAlbum = {
  id: number;
  title: string;
  description: string | null;
  cover_image: string | null;
  image_count: number;
  created_at: string;
  images?: GalleryImage[];
};

export const galleryApi = {
  listAlbums: () => api.get<GalleryAlbum[]>("/gallery/albums").then((r) => r.data),

  getAlbum: (id: number) => api.get<GalleryAlbum>(`/gallery/albums/${id}`).then((r) => r.data),

  createAlbum: (data: FormData) =>
    api.post<GalleryAlbum>("/gallery/albums", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  deleteAlbum: (id: number) => api.delete(`/gallery/albums/${id}`).then((r) => r.data),

  addImages: (albumId: number, data: FormData) =>
    api.post<GalleryImage[]>(`/gallery/albums/${albumId}/images`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  deleteImage: (id: number) => api.delete(`/gallery/images/${id}`).then((r) => r.data),
};
