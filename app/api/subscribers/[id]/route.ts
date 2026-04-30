import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth-helper";
import { adminDb } from "../../../../lib/firebase-admin";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uid = await verifyToken(request);
    const subscriberId = params.id;

    const subscriberRef = adminDb.collection("subscribers").doc(subscriberId);
    const subscriberDoc = await subscriberRef.get();

    if (!subscriberDoc.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (subscriberDoc.data()?.userId !== uid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await subscriberRef.delete();

    // Decrement totalSubscribers count
    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const currentCount = userDoc.data()?.totalSubscribers || 0;
      await userRef.update({
        totalSubscribers: Math.max(0, currentCount - 1),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uid = await verifyToken(request);
    const subscriberId = params.id;
    const body = await request.json();

    if (typeof body.isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const subscriberRef = adminDb.collection("subscribers").doc(subscriberId);
    const subscriberDoc = await subscriberRef.get();

    if (!subscriberDoc.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (subscriberDoc.data()?.userId !== uid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await subscriberRef.update({ isActive: body.isActive });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
