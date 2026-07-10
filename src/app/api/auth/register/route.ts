import { connectDB } from "@/lib/db";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { generateToken } from "@/lib/jwt";
import resumeModel from "@/models/resume.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: RegisterBody = await req.json();
    const { name, email, password, mobile } = body;

    if (!name || !email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const isExisted = await UserModel.findOne({ email });

    if (isExisted) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Email already in use",
        },
        { status: 409 },
      );
    }

    const newUser = await UserModel.create({ name, email, password, mobile });

    await resumeModel.create({
      user_id: newUser._id.toString(),
      title: "Untitled Resume",
      summary: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      education: [],
      certifications: [],
      skills: [],
    });

    const token = generateToken({ userId: newUser._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Account created successfully",
        data: newUser,
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    return response;
  } catch (err) {
    console.log("Error in register route:", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error creating account",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
