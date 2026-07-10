import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
  try {
    await connectDB();

    const userId = await getCurrentUser();
    const { resumeId } = await params;

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const resume = await resumeModel.findOne({ _id: resumeId, user_id: userId });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
          error: "No resume found for the given ID",
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error fetching resume:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error fetching resume",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
  try {
    await connectDB();

    const userId = await getCurrentUser();
    const { resumeId } = await params;

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    const resume = await resumeModel.findOneAndUpdate({ _id: resumeId, user_id: userId }, { $set: body }, { new: true, runValidators: true });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found or failed to update",
          error: "Resume failed to update.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error in update resume api", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in update resume",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ resumeId: string }> }) {
  try {
    await connectDB();

    const userId = await getCurrentUser();
    const { resumeId } = await params;

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User not authenticated",
        },
        { status: 401 },
      );
    }

    const resume = await resumeModel.findOneAndDelete({ _id: resumeId, user_id: userId });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
          error: "No resume found for the given ID",
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume deleted successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error in delete resume api", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error in delete resume",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
