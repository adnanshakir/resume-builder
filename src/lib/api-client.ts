import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/api.types";

export async function apiRequest<T>(
  method: "get" | "post" | "patch" | "delete",
  url: string,
  data?: unknown,
): Promise<ApiResponse<T>> {
  try {
    const res = await axios({ method, url, data });
    return res.data as ApiResponse<T>;
  } catch (err) {
    const axiosErr = err as AxiosError<ApiResponse<T>>;

    const isAuthEndpoint = url.startsWith("/api/auth/");

    if (axiosErr.response?.status === 401 && !isAuthEndpoint && typeof window !== "undefined") {
      const onAuthPage =
        window.location.pathname.startsWith("/auth/login") ||
        window.location.pathname.startsWith("/auth/register");

      if (!onAuthPage) {
        window.location.href = "/auth/login";
      }
    }

    if (axiosErr.response?.data) {
      return axiosErr.response.data;
    }
    return {
      success: false,
      message: "Network error. Please try again.",
    } as ApiResponse<T>;
  }
}