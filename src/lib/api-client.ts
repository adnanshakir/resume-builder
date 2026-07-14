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

    if (axiosErr.response?.status === 401 && typeof window !== "undefined") {
      if (!window.location.pathname.startsWith("/login")) {
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
