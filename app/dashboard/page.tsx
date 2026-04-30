"use client";

import React, { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { motion } from "framer-motion";
import { Users, Send, MousePointerClick, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, SendHorizontal } from "lucide-react";
import { CountUp, FadeUpReveal, StaggerContainer, StaggerItem } from "../components/motion";

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { label: "Total Subscribers", value: "0", icon: Users, trend: "+0%", positive: true },
    { label: "Notifications Sent", value: "0", icon: Send, trend: "+0%", positive: true },
    { label: "Avg Open Rate", value: "0%", icon: MousePointerClick, trend: "0%", positive: false },
    { label: "Active Campaigns", value: "0", icon: Activity, trend: "0%", positive: true },
  ]);

  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const headers = { "Authorization": `Bearer ${token}` };
          
          const [analyticsRes, notificationsRes] = await Promise.all([
            fetch("/api/analytics", { headers }),
            fetch("/api/notifications", { headers })
          ]);
          
          if (analyticsRes.ok) {
            const analyticsData = await analyticsRes.json();
            setStats([
              { label: "Total Subscribers", value: (analyticsData.totalSubscribers || 0).toString(), icon: Users, trend: "+0%", positive: true },
              { label: "Notifications Sent", value: (analyticsData.notificationsSent || 0).toString(), icon: Send, trend: "+0%", positive: true },
              { label: "Avg Open Rate", value: "0%", icon: MousePointerClick, trend: "0%", positive: false },
              { label: "Active Campaigns", value: "0", icon: Activity, trend: "0%", positive: true },
            ]);
          }
          
          if (notificationsRes.ok) {
            const notificationsData = await notificationsRes.json();
            setRecentNotifications(notificationsData.notifications || []);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">Sent</span>;
      case "Scheduled":
        return <span className="status-pending inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Scheduled</span>;
      case "Draft":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* STATS ROW */}
      <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="interactive-card bg-white p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-primary-light text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
                {stat.positive ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-text">
                <CountUp value={Number.parseInt(stat.value.replace(/,/g, ""), 10) || 0} suffix={stat.value.includes("%") ? "%" : ""} />
              </h3>
              <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* MIDDLE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Recent Notifications Table */}
        <FadeUpReveal className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-text">Recent Notifications</h3>
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sent To</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Open Rate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <motion.tbody
                className="bg-white divide-y divide-border"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {recentNotifications.map((notification) => (
                  <motion.tr
                    key={notification.id}
                    className="hover:bg-gray-50/50 transition-colors"
                    variants={{
                      hidden: { opacity: 0, y: -12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text">{notification.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.sentTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">{notification.openRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notification.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(notification.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-primary transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </FadeUpReveal>

        {/* Right: Quick Send Card */}
        <FadeUpReveal className="interactive-card bg-white rounded-2xl border border-border shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-border bg-gray-50/50">
            <h3 className="text-lg font-bold text-text">Quick Send</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Notification title..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button className="interactive-btn w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg shadow-sm shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center">
                <SendHorizontal className="w-4 h-4 mr-2" />
                Send Now
              </button>
            </div>
            
            <div className="mt-8 border-t border-border pt-6">
              <h4 className="text-sm font-bold text-gray-700 mb-4">Subscriber Growth</h4>
              {/* Mini Line Chart (SVG placeholder) */}
              <div className="h-24 w-full relative flex items-end">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Fill */}
                  <path d="M0,100 L0,80 C20,70 40,90 60,40 C80,10 90,30 100,20 L100,100 Z" fill="url(#gradient)" className="opacity-50" />
                  {/* Stroke */}
                  <path d="M0,80 C20,70 40,90 60,40 C80,10 90,30 100,20" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Tooltip dot */}
                <div className="absolute right-0 top-[20%] -mt-1.5 -mr-1.5 w-3 h-3 bg-white border-2 border-primary rounded-full shadow"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </FadeUpReveal>
      </div>
    </div>
  );
}
