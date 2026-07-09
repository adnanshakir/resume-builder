import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { ImproveContentBody } from "@/types/ai.types";
import { generateAiContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();

    const { content, contentType } = body;

    const validContentTypes = ['summary', 'projectDescription', 'workExperience'] as const;

    if (!content || !contentType || !validContentTypes.includes(contentType)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing or invalid required fields",
        },
        { status: 400 },
      );
    }

    const contentTypeInstructions: Record<string, string> = {
      summary: `This is a resume SUMMARY. Keep it to 2-4 sentences (40-60 words). It should read as a cohesive paragraph, not bullet points.`,
      projectDescription: `This is a PROJECT description, written as bullet points. Each bullet must start with a strong action verb and stay under ~20 words.`,
      workExperience: `This is a WORK EXPERIENCE description, written as bullet points. Each bullet must start with a strong action verb and stay under ~20 words. Preserve the original tense (past tense for past roles, present tense if the content implies a current role).`,
    };

    const prompt = `You are an expert resume writer and ATS optimization specialist.

    Improve the following resume content to make it more professional, impactful, and ATS-friendly.

    Content type: ${contentType || "general resume content"}
    ${contentTypeInstructions[contentType ?? ""] ?? ""}

    Original content:
    """
    ${content}
    """

    Requirements:
    - Preserve the original meaning, facts, and scope — do not invent new responsibilities, skills, numbers, percentages, metrics, or technologies that are not present in the original content.
    - Do NOT rename, expand, or substitute any technical term, tool, or technology name — only rephrase surrounding language, never the technology names themselves.
    - Strengthen weak or passive phrasing into active, achievement-oriented language (e.g., "was responsible for" → "led", "helped with" → "contributed to" or a stronger direct verb if the original content supports it).
    - Naturally reinforce relevant keywords already present in the original content for ATS parsing — do not add keywords that weren't implied by the original.
    - Remove filler, redundancy, and generic clichés ("hard worker", "team player", "detail-oriented", "responsible for") without losing any real information.
    - Do not use first-person pronouns (I, my, me, we).
    - Keep the same format as the input: if the input is a single paragraph, return a single paragraph; if the input is bullet points, return the same number of bullet points (do not merge or split them) unless one is clearly redundant.
    - Output plain text only — no markdown, no quotation marks, no bullet symbols like "-" or "•" (bullets should be separate array items in the output, not prefixed with symbols).

    Return ONLY valid JSON in this exact format, with no additional text or markdown fences:
    {
        "improved": "the improved content, or array of bullet strings if the input was bullet points"
    }`;

    const result = await generateAiContent(prompt);

    const { improved } = JSON.parse(result);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Content improved successfully",
        data: {
          improved,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in improving content:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in improving content",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
