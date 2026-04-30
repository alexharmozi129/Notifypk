import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth-helper";
import { adminDb } from "../../../lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const uid = await verifyToken(request);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limitNum = parseInt(searchParams.get("limit") || "20");

    const subscribersRef = adminDb.collection("subscribers");
    const snapshot = await subscribersRef.where("userId", "==", uid).orderBy("subscribedAt", "desc").get();

    let subscribers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const totalCount = subscribers.length;
    const activeCount = subscribers.filter((s: any) => s.isActive).length;

    // Simple memory pagination
    const start = (page - 1) * limitNum;
    subscribers = subscribers.slice(start, start + limitNum);

    return NextResponse.json({ subscribers, totalCount, activeCount });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fcmToken, userAgent, userId, country } = body;

    if (!fcmToken || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subscribersRef = adminDb.collection("subscribers");
    const existingSnapshot = await subscribersRef
      .where("userId", "==", userId)
      .where("fcmToken", "==", fcmToken)
      .limit(1)
      .get();

    if (!existingSnapshot.empty) {
      return NextResponse.json({ success: true, subscriberId: existingSnapshot.docs[0].id });
    }

    const newSubscriberRef = subscribersRef.doc();
    await newSubscriberRef.set({
      userId,
      fcmToken,
      userAgent: userAgent || "Unknown",
      country: country || "Unknown",
      isActive: true,
      subscribedAt: new Date(),
      lastSeen: new Date(),
    });

    // Increment user's totalSubscribers count
    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      await userRef.update({
        totalSubscribers: (userDoc.data()?.totalSubscribers || 0) + 1,
      });
    }

    return NextResponse.json({ success: true, subscriberId: newSubscriberRef.id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/subscribers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
