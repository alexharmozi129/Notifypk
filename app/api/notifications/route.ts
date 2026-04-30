import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth-helper";
import { adminDb } from "../../../lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const uid = await verifyToken(request);

    const snapshot = await adminDb
      .collection("notifications")
      .where("userId", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      status: doc.data().status,
      totalSent: doc.data().totalSent,
      totalDelivered: doc.data().totalDelivered,
      sentAt: doc.data().sentAt,
    }));

    return NextResponse.json(notifications);
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("GET /api/notifications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
