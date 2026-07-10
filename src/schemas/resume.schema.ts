import { z } from "zod";

export const personalInfoSchema = z.object({
  fullname: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  mobile: z.string().trim().min(10, "Enter a valid mobile number"),
  location: z.string().trim().optional().or(z.literal("")),
  github: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  linkedin: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  portfolio: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const summaryInputSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title is required"),
  experienceLevel: z.string().trim().min(1, "Select or enter experience level"),
  skills: z.string().trim().min(1, "Add at least one skill"), // comma-separated in the form, split before sending
});

export type SummaryInputValues = z.infer<typeof summaryInputSchema>;