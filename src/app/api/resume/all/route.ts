import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getCurrentUser();

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const resumes = await resumeModel.find({ user_id: userId }).sort({ updatedAt: -1 });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resumes fetched successfully",
        data: resumes,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error fetching resumes:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error fetching resumes",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
