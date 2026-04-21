import { api } from "./api";
import { coursesMock, type Course } from "@/data/mock";

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const coursesApi = {
  async list(): Promise<Course[]> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      return coursesMock;
    }
    const { data } = await api.get<Course[]>("/courses");
    return data;
  },
};
