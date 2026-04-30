"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Menu, Twitter, X } from "lucide-react";

export function SiteNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="nav-entrance sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
            NotifyPK
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/#features" className="text-sm font-medium text-text hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-text hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-text hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="text-sm font-medium text-text hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-text border border-border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:shadow-primary/40"
          >
            Get Started
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-text rounded-lg border border-border hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileMenuOpen ? (
        <div className="md:hidden border-t border-border/50 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-text hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          <div className="flex flex-col items-start">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight mb-4">
              NotifyPK
            </Link>
            <p className="text-gray-500 max-w-xs">
              Send smarter. Reach faster. The ultimate push notification platform for modern web businesses.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left mx-auto">
            <h4 className="font-bold text-text mb-4">Company</h4>
            <nav className="flex flex-col space-y-3 text-gray-500">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
              <Link href="/#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
              <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-bold text-text mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 NotifyPK. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
