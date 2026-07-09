import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { AtsScoreBody } from "@/types/ai.types";
import { generateAiContent } from "@/lib/gemini";
import { parseAiJson } from "@/lib/parseAiJson";

export async function POST(req: NextRequest) {
  try {
    const body: AtsScoreBody = await req.json();

    const { jobTitle, summary, skills, workExperience, projects, education } = body;

    if (!jobTitle) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const hasContent = summary || skills?.length || workExperience?.length || projects?.length;

    if (!hasContent) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume has no content to evaluate",
        },
        { status: 400 },
      );
    }

    const prompt = `You are an ATS (Applicant Tracking System) simulation engine and resume auditor, combining how real ATS parsers score resumes with how experienced recruiters actually read them.

    Evaluate the following resume content for the target role: "${jobTitle}"

    Resume content:
    ${summary ? `\nSUMMARY:\n${summary}` : ""}
    ${skills?.length ? `\nSKILLS:\n${skills.map((s) => `${s.category}: ${s.items.join(", ")}`).join("\n")}` : ""}
    ${workExperience?.length ? `\nWORK EXPERIENCE:\n${workExperience.map((w) => `${w.position} at ${w.company}:\n${w.description.map((d) => `- ${d}`).join("\n")}`).join("\n\n")}` : ""}
    ${projects?.length ? `\nPROJECTS:\n${projects.map((p) => `${p.title} (${p.techStack.join(", ")}):\n${p.description.map((d) => `- ${d}`).join("\n")}`).join("\n\n")}` : ""}
    ${education?.length ? `\nEDUCATION:\n${education.map((e) => `${e.degree}, ${e.institution}`).join("\n")}` : ""}

    Evaluate on these dimensions:
    1. Keyword relevance — how well the content matches skills/terms expected for "${jobTitle}" and the provided job description" : ""}.
    2. Impact & action-orientation — use of strong action verbs, achievement-focused language (not just responsibilities listed).
    3. ATS parseability — clear section structure, no dense paragraphs where bullets are expected, no unusual formatting cues in the text itself.
    4. Completeness — whether typical sections a recruiter expects for this role level are present or notably missing.
    5. Clarity & conciseness — no filler, no clichés, appropriately concise phrasing.

    Requirements:
    - Score strictly based on the content provided — do not reward or assume information that isn't present.
    - Be honest and critical, not flattering. A sparse or generic resume should score low.
    - Give specific, actionable suggestions tied to the actual content provided (reference real phrases/sections), not generic advice.
    - List missing keywords only if they are genuinely standard for this role/JD and absent from the content.

    Return ONLY valid JSON in this exact format, with no additional text or markdown fences:
    {
      "overallScore": 0,
      "breakdown": {
        "keywordRelevance": 0,
        "impact": 0,
        "atsParseability": 0,
        "completeness": 0,
        "clarity": 0
      },
      "strengths": ["specific strength 1", "specific strength 2"],
      "improvements": ["specific actionable suggestion 1", "specific actionable suggestion 2"],
      "missingKeywords": ["keyword1", "keyword2"]
    }`;

    const result = await generateAiContent(prompt);

    const atsResult = parseAiJson(result);
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "ATS score generated successfully",
        data: atsResult,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error in generating ATS score:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in generating ATS score",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
