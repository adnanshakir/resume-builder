import { apiRequest } from "@/lib/api-client";
import { RegisterBody, LoginBody, IUser } from "@/types/user.types";

export const authService = {
  register: (body: RegisterBody) => apiRequest<{ user: IUser }>("post", "/api/auth/register", body),

  login: (body: LoginBody) => apiRequest<{ user: IUser }>("post", "/api/auth/login", body),

  logout: () => apiRequest<null>("post", "/api/auth/logout"),
};
