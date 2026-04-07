import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

// 1. Font එක හරියටම Define කරමු
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS variable එකක් විදිහට පාවිච්චි කරන්න
});

export const metadata: Metadata = {
  title: "CloudNote.ai",
  description: "Next-Generation AI Note Taking Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. html එකට dark class එකයි lang එකයි දාමු
    <html lang="en" className="dark">
      <body 
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-white`}
      >
        {/* 3. මුළු ඇප් එකම Providers එකෙන් wrap කරමු */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}