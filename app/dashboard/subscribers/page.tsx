"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Users,
  UserCheck,
  UserX,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { CountUp, FadeUpReveal, StaggerContainer, StaggerItem } from "../../components/motion";
import { auth } from "../../../lib/firebase";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const token = await user.getIdToken();
            const res = await fetch("/api/subscribers", {
              headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setSubscribers(data.subscribers || []);
            setTotalCount(data.totalCount || 0);
            setActiveCount(data.activeCount || 0);
            setLoading(false);
          }
        });
        return () => unsubscribe();
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this subscriber?")) return;
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch(`/api/subscribers/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const sub = subscribers.find((s) => s.id === id);
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        setTotalCount((prev) => Math.max(0, prev - 1));
        if (sub?.isActive) setActiveCount((prev) => Math.max(0, prev - 1));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const segments = [
    { label: "All Subscribers", count: totalCount.toString(), icon: Users, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Active", count: activeCount.toString(), icon: UserCheck, bgColor: "bg-primary-light", iconColor: "text-primary" },
    { label: "Inactive", count: (totalCount - activeCount).toString(), icon: UserX, bgColor: "bg-gray-100", iconColor: "text-gray-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-text">Subscribers</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary border border-primary/20">
            {totalCount} total
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-4 max-w-2xl">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search subscribers by browser, country..."
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm shadow-sm focus:scale-[1.02]"
            />
          </div>
          <button className="interactive-btn inline-flex items-center px-4 py-2 border border-border rounded-lg shadow-sm text-sm font-medium text-text bg-white hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            Filters
          </button>
        </div>
        <button className="interactive-btn inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm shadow-primary/20 text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segments.map((segment) => (
          <StaggerItem key={segment.label} className="interactive-card bg-white p-5 rounded-xl border border-border shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${segment.bgColor} ${segment.iconColor}`}>
              <segment.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{segment.label}</p>
              <h3 className="text-2xl font-bold text-text mt-0.5">
                <CountUp value={Number.parseInt(segment.count.replace(/,/g, ""), 10)} />
              </h3>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeUpReveal className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50/80">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscriber</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscribed Date</th>
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
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">Loading subscribers...</td></tr>
              ) : (!Array.isArray(subscribers) || subscribers.length === 0) ? (
                <tr><td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No subscribers found.</td></tr>
              ) : (
                (Array.isArray(subscribers) ? subscribers : []).map((sub) => (
                  <motion.tr
                    key={sub.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 border border-border">
                          <UserCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-text">{sub.userAgent?.substring(0, 20) || "Unknown Browser"}...</div>
                          <div className="text-xs text-gray-500">{sub.fcmToken?.substring(0, 15)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        {sub.country || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sub.subscribedAt ? new Date(sub.subscribedAt._seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sub.isActive 
                          ? 'bg-primary-light text-primary border border-primary/20' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {sub.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-primary bg-white hover:bg-primary-light rounded-md transition-colors border border-transparent hover:border-primary/20" title="View details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200" title="Delete subscriber">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>
      </FadeUpReveal>
    </div>
  );
}
