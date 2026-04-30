"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Zap,
  Smartphone,
  Clock,
  Users,
  BarChart3,
  Code2,
  Star,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Bell,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import {
  CountUp,
  FadeUpReveal,
  StaggerContainer,
  StaggerItem,
} from "./components/motion";

const heroWords = ["Reach", "Your", "Customers", "Instantly"];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* NAVBAR */}
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

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 purple-gradient-flow opacity-95" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-6 border border-primary/20">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                New: Smart Scheduling available
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                {heroWords.map((word, index) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              >
                Send real-time push notifications to your customers' browsers. No app needed. No SMS costs. Just results.
              </motion.p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.45, type: "spring", stiffness: 200, damping: 16 }}
                >
                <Link
                  href="/register"
                  className="interactive-btn w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/30 flex items-center justify-center"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                </motion.div>
                <button className="interactive-btn w-full sm:w-auto px-8 py-3.5 text-base font-medium text-text border-2 border-border rounded-lg hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                  <PlayCircle className="mr-2 w-5 h-5 text-gray-500" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 text-primary" />
                <span>Setup in 15 minutes</span>
              </div>
            </div>

            {/* Hero Right side: Browser Mockup */}
            <motion.div
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl -z-10 rounded-full aspect-square" />
              <div className="interactive-card bg-white rounded-xl shadow-2xl border border-border overflow-hidden duration-500">
                <div className="bg-gray-100 px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-border w-2/3 text-center">
                    yourwebsite.com
                  </div>
                </div>
                <div className="p-8 relative h-[300px] bg-gray-50 flex items-center justify-center">
                  <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-border/50 max-w-[300px] animate-bounce-slow">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-text">Special Offer Inside! 🎁</h4>
                        <p className="text-xs text-gray-500 mt-1">Get 20% off your next purchase. Click here to claim your code.</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative site wireframe */}
                  <div className="w-full space-y-4 opacity-30">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="h-32 bg-gray-200 rounded-lg w-full mt-6"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works">
        <FadeUpReveal className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">How NotifyPK Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Three simple steps to start engaging your visitors and growing your business.</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-light via-primary/30 to-primary-light z-0"></div>
              
              {[
                { step: 1, title: "Add Snippet", desc: "Paste our lightweight JavaScript snippet on your website before the </head> tag." },
                { step: 2, title: "Grow Subscribers", desc: "Your website visitors are prompted to subscribe with a native, one-click prompt." },
                { step: 3, title: "Send & Engage", desc: "Use our dashboard to craft messages, segment users, and send campaigns instantly." },
              ].map((item) => (
                <StaggerItem key={item.step} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:bg-purple-600 transition-all duration-300 border-4 border-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUpReveal>
        </section>

        {/* FEATURES SECTION */}
        <section id="features">
        <FadeUpReveal className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Everything You Need to Engage Customers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Powerful tools designed to maximize your reach and drive conversions effortlessly.</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Instant Delivery", desc: "Messages reach your audience's screens immediately, cutting through the noise." },
                { icon: Smartphone, title: "No App Required", desc: "Works directly on modern web browsers (Chrome, Firefox, Safari) on mobile and desktop." },
                { icon: Clock, title: "Smart Scheduling", desc: "Plan your campaigns in advance and deliver them at the perfect time." },
                { icon: Users, title: "Audience Segments", desc: "Target specific user groups based on behavior, location, and subscription date." },
                { icon: BarChart3, title: "Real-Time Analytics", desc: "Track deliveries, open rates, and clicks as they happen in your dashboard." },
                { icon: Code2, title: "Easy Integration", desc: "Compatible with WordPress, Shopify, Next.js, and custom HTML sites." },
              ].map((feature, idx) => (
                <StaggerItem key={idx} className="interactive-card bg-white p-8 rounded-2xl border border-border hover:border-primary/30 group">
                  <div className="w-14 h-14 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-[360deg] transition-transform duration-500">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUpReveal>
        </section>

        {/* STATS BANNER */}
        <FadeUpReveal className="py-20 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary/20">
              {[
                { value: "10,000+", label: "Notifications Sent Daily" },
                { value: "98%", label: "Delivery Rate" },
                { value: "3x", label: "Higher Open Rate vs Email" },
              ].map((stat, idx) => (
                <div key={idx} className="py-6 md:py-0 px-4">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    {stat.value === "10,000+" && <CountUp value={10000} suffix="+" />}
                    {stat.value === "98%" && <CountUp value={98} suffix="%" />}
                    {stat.value === "3x" && <CountUp value={3} suffix="x" />}
                  </div>
                  <div className="text-lg font-medium text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUpReveal>

        {/* TESTIMONIALS SECTION */}
        <FadeUpReveal className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Trusted by Growing Businesses</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">See how NotifyPK is helping small businesses connect with their audience.</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "We used to rely heavily on email for our daily specials, but open rates were dropping. Since adding NotifyPK, our lunchtime rush has increased by 20%.",
                  name: "Sarah Jenkins",
                  role: "Restaurant Owner",
                  avatar: "SJ"
                },
                {
                  quote: "Perfect for sending class schedule updates and last-minute openings. Our members love not having to download another app just to stay informed.",
                  name: "Marcus Cole",
                  role: "Gym Manager",
                  avatar: "MC"
                },
                {
                  quote: "Cart abandonment was our biggest issue. Now we send a quick push notification reminder, and we've recovered 15% of abandoned carts effortlessly.",
                  name: "Elena Rodriguez",
                  role: "Ecommerce Founder",
                  avatar: "ER"
                }
              ].map((testimonial, idx) => (
                <StaggerItem key={idx} className="interactive-card bg-white p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex text-yellow-400 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0.2 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.2, delay: star * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg italic mb-8">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <div className="font-bold text-text">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeUpReveal>

        {/* CTA BANNER */}
        <section className="py-24 purple-gradient-flow relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-900/30 blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {"Ready to grow your customer base?".split(" ").map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <p className="text-primary-light text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of businesses sending smarter, faster notifications today. Setup takes less than 15 minutes.
            </p>
            <Link
              href="/register"
              className="interactive-btn inline-flex items-center px-10 py-4 text-lg font-bold text-primary bg-white rounded-xl hover:bg-gray-50 shadow-xl duration-300"
            >
              Start For Free
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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
    </div>
  );
}
