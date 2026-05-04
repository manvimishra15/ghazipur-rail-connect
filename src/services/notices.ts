import { api } from "./api";

export type Notice = {
  id: number;
  title: string;
  content: string | null;
  category: string;
  attachment_url: string | null;
  is_active: number;
  created_at: string;
};

export const noticesApi = {
  list: (params?: { category?: string }) =>
    api.get<Notice[]>("/notices", { params }).then((r) => r.data),

  create: (data: FormData) =>
    api.post<Notice>("/notices", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  remove: (id: number) => api.delete(`/notices/${id}`).then((r) => r.data),
};
