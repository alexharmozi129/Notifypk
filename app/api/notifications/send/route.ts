import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth-helper";
import { adminDb, adminMessaging } from "../../../../lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const uid = await verifyToken(request);
    const body = await request.json();
    const { title, body: msgBody, icon, clickUrl, segment } = body;

    if (!title || !msgBody) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
    }

    // Fetch matching subscribers
    let query = adminDb.collection("subscribers").where("userId", "==", uid);
    
    if (segment === "active") {
      query = query.where("isActive", "==", true);
    } else if (segment === "inactive") {
      query = query.where("isActive", "==", false);
    }

    const snapshot = await query.get();
    
    if (snapshot.empty) {
      return NextResponse.json({ error: "No subscribers found for this segment" }, { status: 400 });
    }

    const tokens: string[] = [];
    const tokenToDocId: Record<string, string> = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.fcmToken) {
        tokens.push(data.fcmToken);
        tokenToDocId[data.fcmToken] = doc.id;
      }
    });

    if (tokens.length === 0) {
      return NextResponse.json({ error: "No valid FCM tokens found" }, { status: 400 });
    }

    const response = await adminMessaging.sendEachForMulticast({
      tokens,
      notification: { title, body: msgBody },
      webpush: {
        notification: {
          icon: icon || undefined,
          click_action: clickUrl || undefined,
        },
      },
    });

    // Handle invalid tokens
    let failedTokensCount = 0;
    const invalidTokens: string[] = [];
    
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokensCount++;
        const errCode = resp.error?.code;
        if (
          errCode === "messaging/invalid-registration-token" ||
          errCode === "messaging/registration-token-not-registered"
        ) {
          invalidTokens.push(tokens[idx]);
        }
      }
    });

    // Remove invalid tokens from Firestore
    if (invalidTokens.length > 0) {
      const batch = adminDb.batch();
      invalidTokens.forEach((token) => {
        const docId = tokenToDocId[token];
        if (docId) {
          const docRef = adminDb.collection("subscribers").doc(docId);
          batch.delete(docRef);
        }
      });
      await batch.commit();
    }

    // Save notification history
    const notificationRef = adminDb.collection("notifications").doc();
    await notificationRef.set({
      userId: uid,
      title,
      body: msgBody,
      icon: icon || "",
      clickUrl: clickUrl || "",
      status: "sent",
      totalSent: tokens.length,
      totalDelivered: response.successCount,
      totalClicked: 0,
      sentAt: new Date(),
      createdAt: new Date(),
    });

    // Update user stats
    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      await userRef.update({
        totalNotificationsSent: (userDoc.data()?.totalNotificationsSent || 0) + 1,
      });
    }

    return NextResponse.json({
      sent: tokens.length,
      delivered: response.successCount,
      failed: failedTokensCount,
    });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("POST /api/notifications/send error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
