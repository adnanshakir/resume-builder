import { connectDB } from "@/lib/db";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { generateToken } from "@/lib/jwt";

async function POST(req: NextRequest) {
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
          message: "User already exists",
        },
        { status: 409 },
      );
    }

    const newUser = await UserModel.create({ name, email, password, mobile });

    let token = generateToken({ userId: newUser._id });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error in register route: ", err);
  }
}
