import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateSummaryBody } from "@/types/ai.types";
import { generateAiContent } from "@/lib/gemini";
import { parseAiJson } from "@/lib/parseAiJson";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSummaryBody = await req.json();

    const { experienceLevel, skills, jobTitle } = body;

    if (!experienceLevel || !skills || !jobTitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const prompt = `You are an expert resume writer and career coach specializing in ATS-optimized resumes.

    Generate a professional resume summary based on the following candidate details:
    - Job Title: ${jobTitle}
    - Experience Level: ${experienceLevel} (if this indicates "fresher"/"entry-level"/no prior experience, write a potential-focused summary; if it indicates a number of years, reflect that seniority in tone)
    - Key Skills: ${skills.join(", ")}

    First, infer the most likely industry/domain for this role based on the Job Title and Skills (e.g., "Software Engineer" + "React, Node.js" → Tech/Software Industry). Use this inferred industry context to make the summary's language and framing feel domain-appropriate, but do not explicitly state "Industry: X" in the output.

    Requirements:
    - Write 2-4 sentences (40-60 words), no more.
    - Start with a strong role-based descriptor (e.g., "Results-driven Software Engineer...") — do not start with "I am" or "Experienced professional".
    - Naturally incorporate the listed skills as keywords for ATS parsing, without sounding like a keyword list.
    - Use active voice and quantifiable impact language where appropriate (e.g., "improved", "led", "delivered") — do not invent specific numbers or metrics not provided.
    - Avoid clichés like "team player", "hard worker", "go-getter", "detail-oriented".
    - Do not use first-person pronouns (I, my, me).
    - Output plain text only — no markdown, no headers, no quotation marks around the summary.

    Return ONLY valid JSON in this exact format, with no additional text or markdown fences:
    {
        "summary": "the generated summary text"
    }`;

    const result = await generateAiContent(prompt);

    const { summary } = parseAiJson(result);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Summary generated successfully",
        data: {
          summary,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in generating summary:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in generating summary",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
