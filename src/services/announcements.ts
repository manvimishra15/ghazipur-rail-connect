import { api } from "./api";

export type Announcement = {
  id: number;
  title: string;
  content: string;
  category: string;
  is_pinned: number;
  attachment_url: string | null;
  created_at: string;
  updated_at: string;
};

export const announcementsApi = {
  list: (params?: { category?: string; limit?: number }) =>
    api.get<Announcement[]>("/announcements", { params }).then((r) => r.data),

  latest: (limit = 3) =>
    api.get<Announcement[]>("/announcements", { params: { limit } }).then((r) => r.data),

  get: (id: number) => api.get<Announcement>(`/announcements/${id}`).then((r) => r.data),

  create: (data: FormData) =>
    api.post<Announcement>("/announcements", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  update: (id: number, data: FormData) =>
    api.put<Announcement>(`/announcements/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  remove: (id: number) => api.delete(`/announcements/${id}`).then((r) => r.data),
};
