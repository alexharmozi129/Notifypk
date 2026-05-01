"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        setError("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      const token = await userCredential.user.getIdToken();
      
      // Save token in cookie
      document.cookie = `firebase-auth-token=${token}; path=/; max-age=86400; Secure; SameSite=Strict`;
      
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl shadow-gray-200/50 p-8 rounded-2xl">
        <div className="flex justify-center mb-6">
          <Link href="/" className="text-3xl font-black text-[#7C3AED] tracking-tight">
            NotifyPK
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 mb-8 text-center text-sm">Sign in to your NotifyPK dashboard</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7C3AED] text-gray-900 transition-all text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7C3AED] text-gray-900 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl font-semibold shadow-sm shadow-purple-500/30 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#7C3AED] hover:text-purple-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
