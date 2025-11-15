// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gami",
  description: "Trải nghiệm kho trò chơi Việt Nam cổ điển",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-[#f3e5ab]  bg-cover bg-center text-white">
        {/* Navbar luôn cố định */}
        <Navbar />

        {/* Nội dung chính */}
        <main className="flex-grow bg-[url('/images/wood-texture.jpg')] bg-[#817854]  bg-cover bg-center w-full flex flex-col items-center justify-center bg-black/40">
          {children}
        </main>

        {/* Footer */}
          <Footer />
      </body>
    </html>
  );
}
