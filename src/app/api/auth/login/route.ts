import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/api.types";
import { IUser, LoginBody } from "@/types/user.types";
import { generateToken } from "@/lib/jwt";


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: LoginBody = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const isExisted = await UserModel.findOne({ email });

    if (!isExisted) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    let matchPass = isExisted.comparePassword(password);

    if (!matchPass) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 },
      );
    }

    let token = generateToken({ userId: isExisted._id.toString() });

    let response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User LoggedIn successfully",
        data: isExisted,
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 hour
    });

    return response;
  } catch (err) {
    console.log("Error in register route: ", err);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: (err as Error).message,
      },
      { status: 500 },
    );
  }
}
