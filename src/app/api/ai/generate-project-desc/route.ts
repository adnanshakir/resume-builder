import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";
import { GenerateProjectDescBody } from "@/types/ai.types";
import { generateAiContent } from "@/lib/gemini";
import { parseAiJson } from "@/lib/parseAiJson";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProjectDescBody = await req.json();

    const { experienceLevel, jobTitle, techStack, projectTitle, projectDescription } = body;

    if (!jobTitle || !projectTitle || !techStack?.length || !projectDescription) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const prompt = `You are an expert resume writer specializing in ATS-optimized project descriptions.

    Rewrite the following project into polished, resume-ready bullet points based on:
    - Job Title (target role): ${jobTitle}
    - Experience Level: ${experienceLevel}
    - Project Title: ${projectTitle}
    - Tech Stack: ${techStack.join(", ")}
    - Raw project description (from user, may be informal/rough): "${projectDescription}"

  Requirements:
    - Produce 2-4 bullet points, each 1 sentence (max ~20 words).
    - Each bullet should start with a strong action verb (Built, Developed, Implemented, Designed, Architected, Optimized, Integrated — vary them, don't repeat the same verb).
    - Naturally weave in relevant tech stack items as ATS keywords, but don't just list them.
    - Do NOT rename, expand, or substitute technical terms beyond what's provided — e.g. if the user wrote "sockets", use "sockets" or "socket-based" (not "WebSockets" or a specific library name like "Socket.io") unless that exact term appears in the Tech Stack list or the user's description. Only use technology names that appear verbatim in the Tech Stack array or the raw description.
    - Focus on what was built, the technical approach, and impact/outcome — infer plausible impact framing (e.g., "improving load performance", "streamlining X workflow") ONLY if reasonably implied by the description; do NOT invent specific numbers, percentages, or metrics that aren't in the user's input.
    - Tailor emphasis toward skills relevant to the target Job Title — e.g., if jobTitle is "Frontend Developer", emphasize UI/UX/performance aspects over backend details, and vice versa.
    - Do not use first-person pronouns (I, my, we).
    - Avoid generic filler like "this project showcases my skills".
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
        message: "Project description generated successfully",
        data: {
          description,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in generating project description:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in generating project description",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
