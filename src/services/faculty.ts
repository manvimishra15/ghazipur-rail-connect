import { api } from "./api";

export type Faculty = {
  id: number;
  name: string;
  designation: string;
  department: string | null;
  qualification: string | null;
  experience: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  sort_order: number;
  created_at: string;
};

export const facultyApi = {
  list: () => api.get<Faculty[]>("/faculty").then((r) => r.data),

  get: (id: number) => api.get<Faculty>(`/faculty/${id}`).then((r) => r.data),

  create: (data: FormData) =>
    api.post<Faculty>("/faculty", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  update: (id: number, data: FormData) =>
    api.put<Faculty>(`/faculty/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  remove: (id: number) => api.delete(`/faculty/${id}`).then((r) => r.data),
};
