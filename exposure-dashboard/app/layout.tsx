import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AIChat from "@/components/AIChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exposure OS Dashboard",
  description: "AI-Powered Operations Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B1120] text-white min-h-screen`}
      >
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="ml-64 flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
        {/* AI Chat Widget - Available on all pages */}
        <AIChat />
      </body>
    </html>
  );
}
