import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth-helper";
import { adminDb, adminAuth } from "../../../lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const uid = await verifyToken(request);
    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, email, plan, totalSubscribers } = userDoc.data() || {};

    return NextResponse.json({ name, email, plan, totalSubscribers });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const uid = await verifyToken(request);
    const body = await request.json();
    const { name, password } = body;

    const updates: any = {};

    // Update Firestore User Doc
    if (name) {
      await adminDb.collection("users").doc(uid).update({ name });
      updates.displayName = name;
    }

    // Update Firebase Auth password
    if (password) {
      if (password.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
      }
      updates.password = password;
    }

    if (Object.keys(updates).length > 0) {
      await adminAuth.updateUser(uid, updates);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
