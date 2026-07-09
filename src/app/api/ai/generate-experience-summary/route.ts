import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateWorkExperienceBody } from "@/types/ai.types";
import { generateAiContent } from "@/lib/gemini";
import { parseAiJson } from "@/lib/parseAiJson";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateWorkExperienceBody = await req.json();

    const { jobTitle, experienceLevel, company, position, responsibilities, techStack, currentlyWorking } = body;

    if (!jobTitle || !company || !position || !responsibilities) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const prompt = `You are an expert resume writer specializing in ATS-optimized work experience bullet points.

    Rewrite the following work experience into polished, resume-ready bullet points based on:
    - Target Job Title (role they're applying for): ${jobTitle}
    - Experience Level: ${experienceLevel}
    - Company: ${company}
    - Their Position/Title at this company: ${position}
    - Currently working here: ${currentlyWorking ? "Yes" : "No"}
    ${techStack?.length ? `- Tools/Tech used in this role: ${techStack.join(", ")}` : ""}
    - Raw responsibilities/achievements (from user, may be informal/rough): "${responsibilities}"

    Requirements:
    - Produce 3-5 bullet points, each 1 sentence (max ~20 words).
    - Each bullet should start with a strong action verb, using past tense for past roles or present tense if "Currently working here" is Yes (Led, Developed, Managed, Collaborated, Streamlined, Delivered — vary them, don't repeat the same verb).
    - Do NOT rename, expand, or substitute technical terms or tool names beyond what's explicitly provided in the Tech Stack list or the raw responsibilities text.
    - Do NOT invent specific numbers, percentages, team sizes, or metrics that aren't stated in the user's input.
    - Tailor emphasis toward skills relevant to the Target Job Title — highlight responsibilities most transferable to that target role over unrelated ones.
    - Do not use first-person pronouns (I, my, we).
    - Avoid generic filler like "responsible for" — lead directly with the action instead.
    - Output plain text only — no markdown, no bullet symbols like "-" or "•" (return as array items instead).

    Return ONLY valid JSON in this exact format, with no additional text or markdown fences:
    {
      "description": ["bullet point 1", "bullet point 2", "bullet point 3"]
    }`;

    const result = await generateAiContent(prompt);
    const { description } = parseAiJson(result);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Work experience description generated successfully",
        data: {
          description,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in generating work experience:", err);
    return NextResponse.json<ApiResponse>({
      success: false,
      message: "Error in generating work experience",
      error: (err as Error).message,
    }, { status: 500 });
  }
}
