import { JWTPayload } from "@/types/user.types";
import jwt from "jsonwebtoken";

export const generateToken = (payload: JWTPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded &&
      typeof decoded === "object" &&
      "userId" in decoded &&
      typeof decoded.userId === "string"
    ) {
      return decoded;
    }

    throw new Error("Invalid token");
  } catch {
    throw new Error("Invalid token");
  }
};
