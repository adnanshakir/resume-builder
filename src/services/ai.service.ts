import { apiRequest } from "@/lib/api-client";
import { GenerateSummaryBody } from "@/types/ai.types";

export const aiService = {
  generateSummary: (body: GenerateSummaryBody) =>
    apiRequest<{ summary: string }>("post", "/api/ai/generate-summary", body),
};