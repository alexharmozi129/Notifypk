"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  MousePointerClick,
  UserMinus,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import { CountUp, FadeUpReveal, StaggerContainer, StaggerItem } from "../../components/motion";
import { auth } from "../../../lib/firebase";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          
          // Fetch analytics
          const res = await fetch("/api/analytics", {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const analyticsData = await res.json();
          setData(analyticsData);

          // Fetch recent notifications
          const notifsRes = await fetch("/api/notifications", {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const notifsData = await notifsRes.json();
          setCampaigns(notifsData || []);
        }
      });
      return () => unsubscribe();
    };
    fetchData();
  }, []);

  if (!data) return <div className="p-8 text-center text-gray-500">Loading analytics...</div>;

  const metrics = [
    { label: "Total Subscribers", value: data.totalSubscribers?.toString() || "0", subValue: null, icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Subscribers", value: data.activeSubscribers?.toString() || "0", subValue: null, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Sent", value: data.totalNotificationsSent?.toString() || "0", subValue: null, icon: MousePointerClick, color: "text-primary", bg: "bg-primary-light" },
    { label: "Avg Delivery", value: `${data.avgDeliveryRate || 0}%`, subValue: null, icon: UserMinus, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-text">Analytics Overview</h2>
        
        {/* Date Range Picker */}
        <div className="flex items-center bg-white border border-border rounded-lg p-1 shadow-sm">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary rounded-md transition-colors">
            7 days
          </button>
          <button className="px-3 py-1.5 text-sm font-medium bg-primary-light text-primary rounded-md shadow-sm transition-colors">
            30 days
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary flex items-center transition-colors">
            <Calendar className="w-4 h-4 mr-2" />
            Custom
          </button>
        </div>
      </div>

      {/* TOP METRICS */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <StaggerItem key={metric.label} className="interactive-card bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2.5 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-text">
                {metric.label === "Avg Delivery" ? metric.value : <CountUp value={Number.parseInt(metric.value.replace(/,/g, ""), 10)} />}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* BOTTOM TABLE */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col mt-6">
        <div className="px-6 py-5 border-b border-border bg-gray-50/50">
          <h3 className="text-lg font-bold text-text">Campaign Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sent</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivered</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivery Rate</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <motion.tbody
              className="bg-white divide-y divide-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              {(!Array.isArray(campaigns) || campaigns.length === 0) ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No campaigns found.</td></tr>
              ) : (
                (Array.isArray(campaigns) ? campaigns : []).map((campaign) => {
                  const rate = campaign.totalSent > 0 ? Math.round((campaign.totalDelivered / campaign.totalSent) * 100) + "%" : "0%";
                  return (
                    <motion.tr
                      key={campaign.id}
                      className="hover:bg-gray-50/50 transition-colors"
                      variants={{
                        hidden: { opacity: 0, y: -12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-text">{campaign.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.totalSent}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{campaign.totalDelivered}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-primary mr-2">{rate}</span>
                          <div className="w-16 h-1.5 bg-primary-light rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: rate }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.sentAt ? new Date(campaign.sentAt._seconds * 1000).toLocaleDateString() : 'N/A'}
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
