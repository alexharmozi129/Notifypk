import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth, adminDb } from "../../../../lib/firebase-admin";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = RegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    try {
      // 1. Create user in Firebase Auth
      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName: name,
      });

      // 2. Save user document in Firestore
      const userRef = adminDb.collection("users").doc(userRecord.uid);
      await userRef.set({
        uid: userRecord.uid,
        name,
        email,
        plan: "free",
        totalSubscribers: 0,
        totalNotificationsSent: 0,
        createdAt: new Date(),
      });

      return NextResponse.json({ success: true, uid: userRecord.uid }, { status: 201 });
    } catch (authError: any) {
      if (authError.code === "auth/email-already-exists") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
      throw authError;
    }
  } catch (error: any) {
    console.error("Error in /api/auth/register:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
