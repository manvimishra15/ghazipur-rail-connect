import { api } from "./api";

export type Ebook = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  language: string;
  file_url: string;
  thumbnail_url: string | null;
  download_count: number;
  created_at: string;
};

export const ebooksApi = {
  list: (params?: { category?: string; language?: string }) =>
    api.get<Ebook[]>("/ebooks", { params }).then((r) => r.data),

  download: (id: number) => api.post<Ebook>(`/ebooks/download/${id}`).then((r) => r.data),

  create: (data: FormData) =>
    api.post<Ebook>("/ebooks", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  remove: (id: number) => api.delete(`/ebooks/${id}`).then((r) => r.data),
};
