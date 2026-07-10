import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ApiResponse } from "@/types/api.types";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = await getCurrentUser();

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const newResume = await resumeModel.create({
      user_id: userId,
      title: "Untitled Resume",
      summary: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      education: [],
      certifications: [],
      skills: [],
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume created successfully",
        data: newResume,
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in create resume route:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error creating resume",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}

