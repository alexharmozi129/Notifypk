import { NextRequest } from "next/server";
import { adminAuth } from "./firebase-admin";

export async function verifyToken(request: NextRequest): Promise<string> {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("401"); // Token missing or invalid format
  }

  const token = authHeader.split("Bearer ")[1];
  
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("401"); // Invalid token
  }
}
