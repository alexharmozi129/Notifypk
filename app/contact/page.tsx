"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Twitter, Clock, Phone, Loader2, CheckCircle2, MessageSquare, Users, Handshake, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <SiteNavbar />
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent -z-10" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 blur-3xl rounded-full mix-blend-multiply opacity-50 -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="text-5xl md:text-6xl font-extrabold tracking-tight text-text mb-6"
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-500 max-w-3xl mx-auto"
            >
              Have questions about NotifyPK? Our team is ready to help.
            </motion.p>
          </div>
        </section>

        {/* CONTACT FORM & DETAILS SECTION */}
        <section className="pb-24 pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10">
              
              {/* FORM */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="bg-white rounded-2xl border border-border shadow-sm p-8"
              >
                <h2 className="text-2xl font-bold text-text mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-[400px] text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-2">Message sent!</h3>
                    <p className="text-gray-500">We'll reply within 24 hours.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 text-primary font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                    onSubmit={handleSubmit}
                  >
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-medium text-text mb-2" htmlFor="name">Name</label>
                      <input id="name" required placeholder="John Doe" type="text" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm" />
                    </motion.div>
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-medium text-text mb-2" htmlFor="email">Email</label>
                      <input id="email" required placeholder="john@example.com" type="email" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm" />
                    </motion.div>
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-medium text-text mb-2" htmlFor="subject">Subject</label>
                      <input id="subject" required placeholder="How can we help?" type="text" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm" />
                    </motion.div>
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-medium text-text mb-2" htmlFor="message">Message</label>
                      <textarea id="message" required placeholder="Tell us about your project..." rows={5} className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm resize-none" />
                    </motion.div>
                    <motion.div variants={fadeUpVariant}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center py-3 px-6 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 shadow-md shadow-primary/20 transition-all disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Submit Message"
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </motion.div>

              {/* DETAILS CARD */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="bg-primary-light/40 rounded-2xl border border-primary/20 p-8 flex flex-col"
              >
                <h2 className="text-2xl font-bold text-text mb-6">Contact Details</h2>
                <div className="space-y-6 text-gray-600 flex-grow">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-text mb-1">Email</p>
                      <p>support@notifypk.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-text mb-1">Phone</p>
                      <p>+92 300 0000000</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-text mb-1">Location</p>
                      <p>Lahore, Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-text mb-1">Business Hours</p>
                      <p>Mon-Fri, 9AM - 6PM PKT</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MessageSquare className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-text mb-1">Response Time</p>
                      <p>We reply within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-primary/10">
                  <p className="font-semibold text-text mb-4">Follow us</p>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all shadow-sm"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all shadow-sm"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all shadow-sm"><Facebook className="w-5 h-5" /></a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY CONTACT US SECTION */}
        <section className="py-24 bg-gray-50 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-text">Why Contact Us?</h2>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeUpVariant} className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-primary-light/50 text-primary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">Quick Response</h3>
                <p className="text-gray-600">Our team responds within 24 hours.</p>
              </motion.div>
              
              <motion.div variants={fadeUpVariant} className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-primary-light/50 text-primary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">Expert Support</h3>
                <p className="text-gray-600">Get help from our notification experts.</p>
              </motion.div>
              
              <motion.div variants={fadeUpVariant} className="bg-white p-8 rounded-2xl border border-border shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-primary-light/50 text-primary flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">Partnership</h3>
                <p className="text-gray-600">Interested in partnering with NotifyPK?</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 bg-primary text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
            <p className="text-primary-light text-xl mb-10 opacity-90">
              Join 10,000+ businesses using NotifyPK
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
          </motion.div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
