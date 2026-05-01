"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Send,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import { auth, storage } from "../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setIsUploading(true);
    try {
      const fileRef = ref(storage, `avatars/${user.uid}_${Date.now()}`);
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      
      await updateProfile(user, { photoURL });
      setUser({ ...user, photoURL }); // Update local state
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    document.cookie = "firebase-auth-token=; path=/; max-age=0;";
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Subscribers", href: "/dashboard/subscribers", icon: Users },
    { name: "Send Notification", href: "/dashboard/send", icon: Send },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  // Derive the page title from the current path
  const currentNav = navItems.find((item) => item.href === pathname);
  const pageTitle = currentNav ? currentNav.name : "Dashboard";

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* SIDEBAR */}
      <motion.aside
        className="w-64 bg-white border-r border-border hidden md:flex flex-col"
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/" className="text-xl font-bold text-primary tracking-tight">
            NotifyPK
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`interactive-btn flex items-center px-3 py-2.5 rounded-lg font-medium duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-gray-600 hover:bg-primary-light hover:text-primary"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-border/50">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
            <img
              src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "User") + "&background=7C3AED&color=fff"}
              alt="User avatar"
              onClick={handleAvatarClick}
              className={`w-10 h-10 rounded-full border border-border object-cover ${isUploading ? 'opacity-50' : 'hover:opacity-80 transition-opacity'}`}
              title="Change Profile Picture"
            />
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-sm font-medium text-text truncate">{user?.displayName || "User"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || "Loading..."}</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TOP NAVBAR */}
        <header className="nav-entrance h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center">
            <button className="md:hidden p-2 -ml-2 text-gray-400 hover:text-gray-500 mr-2">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-text hidden sm:block">{pageTitle}</h1>
          </div>

          <div className="flex-1 max-w-lg mx-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search campaigns, subscribers..."
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm focus:scale-[1.02]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="interactive-btn relative p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary-light">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            
            <img
              className={`h-8 w-8 rounded-full border border-border md:hidden object-cover ${isUploading ? 'opacity-50' : 'cursor-pointer hover:opacity-80 transition-opacity'}`}
              src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "User") + "&background=7C3AED&color=fff"}
              alt="User avatar"
              onClick={handleAvatarClick}
              title="Change Profile Picture"
            />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </motion.div>
  );
}
