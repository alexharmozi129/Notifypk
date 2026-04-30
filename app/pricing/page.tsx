"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Check, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter, SiteNavbar } from "../components/site-chrome";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard settings."
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Pro plan comes with a 14-day free trial. No credit card required."
  },
  {
    q: "How does the subscriber count work?",
    a: "A subscriber is any user who has opted in to receive push notifications from your website."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No contracts, no hidden fees. Cancel anytime with one click."
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <SiteNavbar />
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-text mb-6"
            >
              Simple Transparent Pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-500 max-w-3xl mx-auto"
            >
              Choose the plan that fits your business and scale as you grow.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <div className="relative inline-flex items-center bg-primary-light/60 rounded-full p-1 border border-primary/20">
                <div 
                  className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out ${isYearly ? 'translate-x-full' : 'translate-x-0'}`}
                />
                <button
                  type="button"
                  onClick={() => setIsYearly(false)}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isYearly ? "text-primary" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setIsYearly(true)}
                  className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${isYearly ? "text-primary" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Yearly
                </button>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                Save 20%
              </span>
            </motion.div>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section className="py-24 bg-primary-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Free Card */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-2xl border border-border shadow-sm p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-text mb-2">Free</h3>
                <p className="text-gray-500 mb-6">Best for getting started</p>
                <p className="text-4xl font-black text-text mb-6">$0</p>
                <ul className="space-y-4 text-gray-600 flex-grow mb-8">
                  {[
                    "Up to 500 subscribers",
                    "1 website",
                    "Basic analytics",
                    "Email support",
                    "Basic segmentation",
                    "1,000 notifications/month"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 text-sm font-bold text-text border-2 border-border rounded-xl hover:border-primary/50 hover:bg-gray-50 transition-colors"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
              </motion.div>

              {/* Pro Card */}
              <motion.div variants={fadeUpVariant} className="relative bg-primary rounded-2xl border border-primary p-8 text-white shadow-[0_0_40px_-10px_rgba(147,51,234,0.5)] flex flex-col">
                <p className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-white/20 mb-4 self-start">Most Popular</p>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-primary-light mb-6">For growing teams</p>
                <p className="text-4xl font-black mb-6">{isYearly ? "$24" : "$29"}<span className="text-base font-medium font-normal">/mo</span></p>
                <ul className="space-y-4 text-primary-light flex-grow mb-8">
                  {[
                    "Up to 10,000 subscribers",
                    "5 websites",
                    "Advanced analytics",
                    "A/B Testing",
                    "Priority support",
                    "Smart segmentation",
                    "100,000 notifications/month",
                    "Custom branding"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 text-sm font-bold text-primary bg-white rounded-xl shadow-lg transition-all"
                  >
                    Start Free Trial
                  </motion.button>
                </Link>
              </motion.div>

              {/* Enterprise Card */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-2xl border border-border shadow-sm p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-text mb-2">Enterprise</h3>
                <p className="text-gray-500 mb-6">For high-scale organizations</p>
                <p className="text-4xl font-black text-text mb-6">Custom</p>
                <ul className="space-y-4 text-gray-600 flex-grow mb-8">
                  {[
                    "Unlimited subscribers",
                    "Unlimited websites",
                    "Custom analytics dashboard",
                    "Dedicated CSM",
                    "SLA guarantee",
                    "Custom integrations",
                    "Unlimited notifications",
                    "White label option"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-6 text-sm font-bold text-text border-2 border-border rounded-xl hover:border-primary/50 hover:bg-gray-50 transition-colors"
                  >
                    Contact Sales
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-text">Compare Features</h2>
              <p className="text-gray-500 mt-4">See exactly what you get with each plan.</p>
            </motion.div>

            <div className="overflow-x-auto bg-white border border-border rounded-2xl shadow-sm">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 w-1/4">Feature</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 w-1/4">Free</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-primary w-1/4">Pro</th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 w-1/4">Enterprise</th>
                  </tr>
                </thead>
                <motion.tbody 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="divide-y divide-border"
                >
                  {[
                    { name: "Subscribers", f: "500", p: "10,000", e: "Unlimited" },
                    { name: "Websites", f: "1", p: "5", e: "Unlimited" },
                    { name: "Notifications/month", f: "1,000", p: "100,000", e: "Unlimited" },
                    { name: "Analytics", f: "Basic", p: "Advanced", e: "Advanced + Custom" },
                    { name: "Support", f: "Email", p: "Priority", e: "Dedicated" },
                    { name: "A/B Testing", f: false, p: true, e: true },
                    { name: "Custom Branding", f: false, p: false, e: true },
                    { name: "API Access", f: false, p: true, e: true },
                    { name: "White Label", f: false, p: false, e: true },
                  ].map((row, idx) => (
                    <motion.tr variants={fadeUpVariant} key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text">{row.name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {typeof row.f === 'boolean' ? (row.f ? <Check className="w-5 h-5 text-primary" /> : <X className="w-5 h-5 text-gray-300" />) : row.f}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        {typeof row.p === 'boolean' ? (row.p ? <Check className="w-5 h-5 text-primary" /> : <X className="w-5 h-5 text-gray-300" />) : row.p}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {typeof row.e === 'boolean' ? (row.e ? <Check className="w-5 h-5 text-primary" /> : <X className="w-5 h-5 text-gray-300" />) : row.e}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-primary-light/10 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-text">Frequently Asked Questions</h2>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {faqs.map((faq, idx) => (
                <motion.div 
                  variants={fadeUpVariant}
                  key={idx} 
                  className="bg-white border border-border rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-semibold text-text">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-border/50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-primary overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start growing with NotifyPK today</h2>
              <p className="text-primary-light text-lg mb-10 opacity-90">
                Try NotifyPK free and upgrade when you are ready.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href="/register"
                  className="inline-flex items-center px-10 py-4 text-lg font-bold text-primary bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
                >
                  Start For Free
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </motion.div>
              <div className="mt-8 flex items-center justify-center text-primary-light text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Cancel anytime
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
