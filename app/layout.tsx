import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageShell from "./components/page-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "NotifyPK - Reach Your Customers Instantly",
  description: "Send real-time push notifications to your customers' browsers. No app needed. No SMS costs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
