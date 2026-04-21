import { api } from "./api";
import type { Role } from "@/data/mock";

const USE_MOCK = !import.meta.env.VITE_API_BASE_URL;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const authApi = {
  async login(payload: LoginPayload): Promise<{ token: string; user: AuthUser }> {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return {
        token: `mock.admin.${Date.now()}`,
        user: {
          id: "mock-admin",
          name: "Principal / Admin",
          email: payload.email,
          role: "admin",
        },
      };
    }

    const { data } = await api.post<{ token: string; user: AuthUser }>("/api/login", payload);
    return data;
  },

  async logout(): Promise<void> {
    if (!USE_MOCK) await api.post("/auth/logout").catch(() => undefined);
  },
};
