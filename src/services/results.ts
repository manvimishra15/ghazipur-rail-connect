import { api } from "./api";

export type Result = {
  id: number;
  course_name: string;
  batch: string;
  exam_date: string | null;
  result_pdf_url: string | null;
  published_at: string;
};

export const resultsApi = {
  list: () => api.get<Result[]>("/results").then((r) => r.data),

  create: (data: FormData) =>
    api.post<Result>("/results", data, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data),

  remove: (id: number) => api.delete(`/results/${id}`).then((r) => r.data),
};
