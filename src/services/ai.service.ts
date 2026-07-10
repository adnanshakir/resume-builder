import { apiRequest } from "@/lib/api-client";
import { GenerateSummeryBody } from "@/types/ai.types";

export const aiService = {
  generateSummary: (body: GenerateSummeryBody) =>
    apiRequest<{ summary: string }>("post", "/api/ai/generate-summary", body),
};