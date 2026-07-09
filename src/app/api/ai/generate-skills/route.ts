import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateSkillsBody } from "@/types/ai.types";
import { generateAiContent } from "@/lib/gemini";
import { parseAiJson } from "@/lib/parseAiJson";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSkillsBody = await req.json();

    const { experienceLevel, jobTitle, skills = [] } = body;

    if (!experienceLevel || !jobTitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const prompt = `You are an expert resume writer and ATS optimization specialist.

    Generate a categorized skills section for a resume based on the following candidate details:
    - Job Title: ${jobTitle}
    - Experience Level: ${experienceLevel}
    - User-provided skills (if any): ${skills.length ? skills.join(", ") : "None"}

    Your task:
    1. Keep ALL user-provided skills exactly as given — do not remove, rename, or rephrase them.
    2. Infer the role type from the Job Title (e.g., "Full-stack Developer", "Frontend Developer", "Data Analyst") and supplement with commonly expected tools/technologies for that role that the user likely forgot to mention. For example, a "Full-stack Developer" who only listed "React" is very likely to also use Git, npm/yarn, REST APIs, Postman, and a CSS framework like Tailwind — add such standard, high-confidence tools.
    3. Only add tools/tech that are genuinely standard and expected for this role. Do NOT add niche, unrelated, or overly specific tools the user has no signal for (e.g., don't add "Kubernetes" for a junior frontend dev with no backend skills listed).
    4. Do NOT add soft skills unless the user explicitly provided them.
    5. Organize the final skill set into logical categories relevant to the role (e.g., "Languages", "Frameworks & Libraries", "Tools & Platforms", "Databases" — adapt category names to fit the actual role, don't force irrelevant categories).
    6. Cap total skills at a reasonable resume-appropriate number (roughly 10-16 total across all categories) — prioritize the most relevant and commonly-paired ones if there are more candidates than that.

    Return ONLY valid JSON in this exact format, with no additional text or markdown fences:
    {
      "skills": [
        { "category": "Languages", "items": ["JavaScript", "TypeScript"] },
        { "category": "Frameworks & Libraries", "items": ["React", "Tailwind CSS"] }
      ]
    }`;

    const result = await generateAiContent(prompt);

    const { skills: generatedSkills } = parseAiJson(result);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Skills generated successfully",
        data: {
          skills: generatedSkills,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in generating skills:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in generating skills",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
