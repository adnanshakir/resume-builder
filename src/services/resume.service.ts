import { apiRequest } from "@/lib/api-client";
import { IResume } from "@/types/resume.types";

export const resumeService = {
  getAll: () => apiRequest<IResume[]>("get", "/api/resume/all"),

  create: () => apiRequest<IResume>("post", "/api/resume/create"),

  getById: (resumeId: string) =>
    apiRequest<IResume>("get", `/api/resume/${resumeId}`),

  update: (resumeId: string, body: Partial<IResume>) =>
    apiRequest<IResume>("patch", `/api/resume/${resumeId}`, body),

  delete: (resumeId: string) =>
    apiRequest<null>("delete", `/api/resume/${resumeId}`),
};