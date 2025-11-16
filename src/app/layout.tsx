// app/layout.tsx
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = pathname !== "/"; // Không show navbar ở home page

  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gami - Trò chơi Việt Nam cổ điển</title>
        <meta name="description" content="Trải nghiệm kho trò chơi Việt Nam cổ điển" />
        <link rel="icon" href="/images/banner.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/banner.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
        {/* Navbar - không show ở home */}
        {showNavbar && <Navbar />}

        {/* Main Content */}
        <main className="grow bg-linear-to-br from-slate-950/80 via-blue-900/20 to-slate-950/80 w-full flex flex-col items-center justify-center">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
