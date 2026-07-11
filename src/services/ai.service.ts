// services/ai.service.ts
import { apiRequest } from "@/lib/api-client";
import {
  GenerateSummaryBody,
  GenerateSkillsBody,
  GenerateProjectDescBody,
  GenerateWorkExperienceBody,
} from "@/types/ai.types";
import { ISkillCategory } from "@/types/resume.types";

export const aiService = {
  generateSummary: (body: GenerateSummaryBody) =>
    apiRequest<{ summary: string }>("post", "/api/ai/generate-summary", body),

  generateSkills: (body: GenerateSkillsBody) =>
    apiRequest<{ skills: ISkillCategory[] }>("post", "/api/ai/generate-skills", body),

  generateProjectDesc: (body: GenerateProjectDescBody) =>
    apiRequest<{ description: string[] }>("post", "/api/ai/generate-project-desc", body),

  generateWorkExperience: (body: GenerateWorkExperienceBody) =>
    apiRequest<{ description: string[] }>("post", "/api/ai/generate-experience-summary", body),
};