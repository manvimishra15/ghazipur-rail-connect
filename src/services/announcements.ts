import { api } from "./api";
import { announcementsMock, type Announcement } from "@/data/mock";

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const announcementsApi = {
  async list(): Promise<Announcement[]> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 250));
      return announcementsMock;
    }
    const { data } = await api.get<Announcement[]>("/announcements");
    return data;
  },
  async latest(limit = 3): Promise<Announcement[]> {
    const all = await announcementsApi.list();
    return [...all]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, limit);
  },
};
