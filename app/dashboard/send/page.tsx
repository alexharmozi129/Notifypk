"use client";

import React, { useState } from "react";
import { auth } from "../../../lib/firebase";
import { motion } from "framer-motion";
import {
  Upload,
  Clock,
  SendHorizontal,
  Save,
  Bell,
  Eye,
  Settings,
  X,
  Target,
  Link as LinkIcon
} from "lucide-react";
import { FadeUpReveal, StaggerContainer, StaggerItem } from "../../components/motion";

export default function SendNotificationPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("https://yourwebsite.com/");
  const [schedule, setSchedule] = useState("now");
  const [isSending, setIsSending] = useState(false);
  const [segment, setSegment] = useState("all");

  const handleSend = async () => {
    if (!title || !message) {
      alert("Please provide both title and message");
      return;
    }
    
    setIsSending(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, body: message, clickUrl: url, segment })
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("Notification sent successfully!");
        setTitle("");
        setMessage("");
      } else {
        alert("Failed to send: " + (data.error || "Unknown error"));
      }
    } catch (e) {
      console.error(e);
      alert("Error sending notification");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text">Send Notification</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: COMPOSE FORM */}
        <div className="lg:col-span-7 space-y-6">
          <FadeUpReveal className="interactive-card bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold text-text mb-6 pb-4 border-b border-border">Compose Message</h3>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={50}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                  placeholder="e.g. Flash Sale: 50% Off Everything!"
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${title.length >= 45 ? 'text-orange-500' : 'text-gray-400'}`}>
                    {title.length}/50
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message Body
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={130}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none bg-gray-50 focus:bg-white"
                  placeholder="Type your compelling message here..."
                ></textarea>
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${message.length >= 120 ? 'text-orange-500' : 'text-gray-400'}`}>
                    {message.length}/130
                  </span>
                </div>
              </div>

              {/* Click URL & Icon Upload Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    Click URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full border border-border rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon Image
                  </label>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-3 flex items-center justify-center bg-primary-light/50 hover:bg-primary-light transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-2 text-primary">
                      <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-sm font-medium">Upload Icon</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">192x192px PNG or JPG</p>
                </div>
              </div>

              {/* Target & Schedule */}
              <div className="pt-6 border-t border-border space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-gray-500" />
                    Target Audience
                  </label>
                  <select 
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none"
                  >
                    <option value="all">All Subscribers</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    Schedule
                  </label>
                  <div className="flex space-x-4">
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-all ${schedule === 'now' ? 'border-primary bg-primary-light/30 ring-1 ring-primary' : 'border-border bg-white hover:bg-gray-50'}`}>
                      <input type="radio" name="schedule" className="sr-only" checked={schedule === 'now'} onChange={() => setSchedule('now')} />
                      <span className={`text-sm font-medium ${schedule === 'now' ? 'text-primary' : 'text-gray-700'}`}>Send Now</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer transition-all ${schedule === 'later' ? 'border-primary bg-primary-light/30 ring-1 ring-primary' : 'border-border bg-white hover:bg-gray-50'}`}>
                      <input type="radio" name="schedule" className="sr-only" checked={schedule === 'later'} onChange={() => setSchedule('later')} />
                      <span className={`text-sm font-medium ${schedule === 'later' ? 'text-primary' : 'text-gray-700'}`}>Pick Date & Time</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSend}
                  disabled={isSending}
                  className="interactive-btn flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl shadow-md shadow-primary/20 transition-all hover:shadow-primary/40 flex items-center justify-center text-lg disabled:opacity-50"
                >
                  <SendHorizontal className="w-5 h-5 mr-2" />
                  {isSending ? "Sending..." : "Send Notification"}
                </button>
                <button className="interactive-btn sm:w-auto px-6 py-3 border-2 border-border text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Save className="w-5 h-5 mr-2" />
                  Save Draft
                </button>
              </div>
            </div>
          </FadeUpReveal>
        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <FadeUpReveal className="interactive-card bg-primary-light/30 p-6 sm:p-8 rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-lg font-bold text-text flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary" />
                  Live Preview
                </h3>
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Mac OS • Chrome
                </span>
              </div>

              {/* Mockup Container */}
              <div className="relative z-10 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border overflow-hidden">
                {/* Browser Header */}
                <div className="bg-[#F1F3F4] px-4 py-2 border-b border-gray-200 flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md px-3 py-1 flex items-center text-xs text-gray-500 border border-gray-200">
                    <div className="w-4 h-4 mr-2 bg-gray-200 rounded"></div>
                    yourwebsite.com
                  </div>
                </div>
                
                {/* Notification Area */}
                <div className="bg-gray-50 h-[300px] p-6 relative">
                  {/* The actual notification toast */}
                  <motion.div
                    className="absolute top-6 right-6 w-[340px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start p-4">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
                        <Bell className="w-6 h-6" />
                      </div>
                      
                      {/* Content */}
                      <div className="ml-4 flex-1 pt-0.5 min-w-0">
                        <h4 className="font-bold text-[15px] text-gray-900 leading-tight truncate">
                          {title || "Notification Title"}
                        </h4>
                        <p className="text-[13px] text-gray-600 mt-1 leading-snug break-words line-clamp-3">
                          {message || "Type your message in the composer to see the preview here..."}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-2 flex items-center">
                          yourwebsite.com <span className="mx-1">•</span> just now
                        </p>
                      </div>
                    </div>
                    
                    {/* Settings/Close Mock */}
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="p-1 rounded hover:bg-gray-100 cursor-pointer text-gray-400">
                        <Settings className="w-3.5 h-3.5" />
                      </div>
                      <div className="p-1 rounded hover:bg-gray-100 cursor-pointer text-gray-400">
                        <X className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-gray-600">
                  This notification will reach <span className="text-primary font-bold">1,102</span> active subscribers.
                </p>
              </div>
            </FadeUpReveal>
          </div>
        </div>

      </div>
    </div>
  );
}
