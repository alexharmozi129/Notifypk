"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle2, CreditCard, User } from "lucide-react";
import { FadeUpReveal, StaggerContainer, StaggerItem } from "../../components/motion";
import { auth } from "../../../lib/firebase";

type SettingsTab =
  | "Website Integration"
  | "Account Settings"
  | "Notification Preferences"
  | "Billing & Plan";

const getIntegrationSnippet = (uid: string) => `<!-- NotifyPK Push Notifications -->
<script>
  (function() {
    // Initialize Firebase messaging
    const NOTIFY_USER_ID = '${uid || 'YOUR_SITE_KEY_HERE'}';
    
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function(registration) {
          console.log('NotifyPK: Service Worker registered');
        });
    }
    
    fetch('https://YOUR_DOMAIN/api/fcm-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: NOTIFY_USER_ID })
    });
  })();
</script>`;

const navItems: SettingsTab[] = [
  "Website Integration",
  "Account Settings",
  "Notification Preferences",
  "Billing & Plan",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Website Integration");
  const [copied, setCopied] = useState(false);
  const [connectionVerified, setConnectionVerified] = useState(false);
  
  // Account state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          setUid(user.uid);
          const token = await user.getIdToken();
          const res = await fetch("/api/settings", {
            headers: { "Authorization": `Bearer ${token}` }
          });
          const data = await res.json();
          setName(data.name || "");
          setEmail(data.email || "");
          setPlan(data.plan || "free");
          setLoading(false);
        }
      });
      return () => unsubscribe();
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const payload: any = { name };
      if (newPassword) payload.password = newPassword;

      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setNewPassword("");
      } else {
        const data = await res.json();
        alert("Failed to save: " + data.error);
      }
    } catch (e) {
      console.error(e);
      alert("Error saving settings");
    }
  };

  const renderPanel = useMemo(() => {
    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

    if (activeTab === "Website Integration") {
      return (
        <FadeUpReveal className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Website Integration</h2>
          <p className="text-sm text-gray-500 mb-6">
            Add NotifyPK to your website in 3 simple steps.
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Step 1 - Copy the Code Snippet</h3>
              <pre className="bg-gray-900 text-green-400 font-mono text-sm rounded-lg p-4 overflow-x-auto">
                <code>{getIntegrationSnippet(uid)}</code>
              </pre>
              <button
                type="button"
                className="interactive-btn w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-medium transition-colors flex items-center justify-center gap-2"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(getIntegrationSnippet(uid));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  } catch {
                    setCopied(false);
                  }
                }}
              >
                {copied ? <><Check className="h-4 w-4" />Copied!</> : "Copy Code"}
              </button>
            </div>
          </div>
        </FadeUpReveal>
      );
    }

    if (activeTab === "Account Settings") {
      return (
        <FadeUpReveal className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Account Settings</h2>
          <p className="text-sm text-gray-500 mb-6">Manage your personal profile details.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
              <input
                value={email}
                disabled
                className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleSaveProfile}
            className="interactive-btn mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 font-medium transition-colors flex items-center justify-center gap-2"
          >
            {saved ? <Check className="h-4 w-4" /> : null}
            {saved ? "Saved" : "Save Changes"}
          </motion.button>
        </FadeUpReveal>
      );
    }

    if (activeTab === "Notification Preferences") {
      return (
        <FadeUpReveal className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Notification Preferences</h2>
          <p className="text-sm text-gray-500 mb-6">Manage how you receive alerts and updates.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                <p className="text-xs text-gray-500">Receive weekly digests and alerts via email.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                <p className="text-xs text-gray-500">Receive real-time alerts on your devices.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </FadeUpReveal>
      );
    }

    if (activeTab === "Billing & Plan") {
      return (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Billing &amp; Plan</h2>
            <div className="border-2 border-[#7C3AED] rounded-xl p-6 mt-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-gray-900 capitalize">{plan} Plan</h3>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  Current Plan
                </span>
              </div>
              <button className="mt-6 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }, [activeTab, copied, connectionVerified, name, email, plan, newPassword, saved, loading, uid]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        <aside className="col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-3">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = item === activeTab;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setActiveTab(item)}
                    className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[#7C3AED] text-white"
                        : "text-gray-600 hover:bg-[#F5F0FF] hover:text-gray-900"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="col-span-3">{renderPanel}</section>
      </div>
    </div>
  );
}
