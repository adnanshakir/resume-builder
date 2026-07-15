import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 0,
    });

    return response;
  } catch (err) {
    console.log("Error in logout route: ", err);
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