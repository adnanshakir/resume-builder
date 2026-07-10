import { verifyToken } from "./jwt";
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("No token found");

    const decoded = verifyToken(token);
    if (!decoded) throw new Error("Unauthorized");

    return decoded.userId;
  } catch(err) {
    console.log("Error while getting current user", err);
    return null;
  }
}
