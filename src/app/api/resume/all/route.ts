import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const resumes = await resumeModel.find({ user_id: user.userId }).sort({ updatedAt: -1 });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resumes,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error in get resume api", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in get resume",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
