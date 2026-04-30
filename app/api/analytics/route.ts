import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth-helper";
import { adminDb } from "../../../lib/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const uid = await verifyToken(request);

    // Get user stats from users collection
    const userDoc = await adminDb.collection("users").doc(uid).get();
    const userData = userDoc.data();
    
    // Total & Active subscribers count
    const subscribersRef = adminDb.collection("subscribers").where("userId", "==", uid);
    const activeSubscribersRef = subscribersRef.where("isActive", "==", true);
    
    const [totalSubsCount, activeSubsCount] = await Promise.all([
      subscribersRef.count().get(),
      activeSubscribersRef.count().get()
    ]);

    // Subscriptions in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentSubsSnapshot = await subscribersRef
      .where("subscribedAt", ">=", thirtyDaysAgo)
      .get();
      
    const subscribersLast30Days = recentSubsSnapshot.docs.map(doc => ({
      date: doc.data().subscribedAt.toDate().toISOString(),
    }));

    // Notifications in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentNotifsSnapshot = await adminDb.collection("notifications")
      .where("userId", "==", uid)
      .where("createdAt", ">=", sevenDaysAgo)
      .get();

    let totalDeliveredAllTime = 0;
    let totalSentAllTime = 0;
    
    const notificationsLast7Days = recentNotifsSnapshot.docs.map(doc => {
      const data = doc.data();
      totalSentAllTime += data.totalSent || 0;
      totalDeliveredAllTime += data.totalDelivered || 0;
      return {
        date: data.createdAt.toDate().toISOString(),
        sent: data.totalSent,
        delivered: data.totalDelivered
      };
    });

    // Top Countries
    const topCountriesMap: Record<string, number> = {};
    const allSubsSnapshot = await subscribersRef.get(); // Since we might have many, in production better to use a cron job to aggregate
    allSubsSnapshot.docs.forEach(doc => {
      const country = doc.data().country || "Unknown";
      topCountriesMap[country] = (topCountriesMap[country] || 0) + 1;
    });

    const topCountries = Object.entries(topCountriesMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const avgDeliveryRate = totalSentAllTime > 0 
      ? Math.round((totalDeliveredAllTime / totalSentAllTime) * 100) 
      : 0;

    return NextResponse.json({
      totalSubscribers: totalSubsCount.data().count,
      activeSubscribers: activeSubsCount.data().count,
      totalNotificationsSent: userData?.totalNotificationsSent || 0,
      avgDeliveryRate,
      subscribersLast30Days,
      notificationsLast7Days,
      topCountries,
    });
  } catch (error: any) {
    if (error.message === "401") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    console.error("GET /api/analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
