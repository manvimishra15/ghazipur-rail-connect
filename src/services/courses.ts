import { api } from "./api";

export type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  start_date: string;
  end_date: string;
  seats: number;
  status: "upcoming" | "ongoing" | "completed";
  created_at: string;
};

export const coursesApi = {
  list: (params?: { status?: string; category?: string }) =>
    api.get<Course[]>("/courses", { params }).then((r) => r.data),

  get: (id: number) => api.get<Course>(`/courses/${id}`).then((r) => r.data),

  create: (data: Partial<Course>) => api.post<Course>("/courses", data).then((r) => r.data),

  update: (id: number, data: Partial<Course>) => api.put<Course>(`/courses/${id}`, data).then((r) => r.data),

  remove: (id: number) => api.delete(`/courses/${id}`).then((r) => r.data),
};
