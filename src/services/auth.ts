import { api } from "./api";

export type AuthUser = {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  role?: string;
  type: "admin" | "trainee";
  batch?: string;
  course?: string;
  roll_number?: string;
};

export type LoginPayload = { email: string; password: string };
export type TraineeLoginPayload = { mobile: string; dob: string };

export const authApi = {
  async login(payload: LoginPayload): Promise<{ token: string; user: AuthUser }> {
    const { data } = await api.post<{ token: string; user: AuthUser }>("/auth/admin/login", payload);
    return data;
  },

  async traineeLogin(payload: TraineeLoginPayload): Promise<{ token: string; user: AuthUser }> {
    const { data } = await api.post<{ token: string; user: AuthUser }>("/auth/trainee/login", payload);
    return data;
  },

  async logout(): Promise<void> {
    // JWT is stateless — just clear client-side
  },
};
