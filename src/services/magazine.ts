import { api } from "./api";

export type MagazineIssue = {
  id: number;
  title: string;
  issue_number: string | null;
  volume: string | null;
  published_date: string | null;
  cover_image_url: string | null;
  pdf_url: string;
  description: string | null;
  created_at: string;
};

export const magazineApi = {
  list: () => api.get<MagazineIssue[]>("/magazine").then((r) => r.data),

  create: (data: FormData) =>
    api.post<MagazineIssue>("/magazine", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  remove: (id: number) => api.delete(`/magazine/${id}`).then((r) => r.data),
};
