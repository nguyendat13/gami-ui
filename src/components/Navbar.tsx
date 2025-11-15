"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Gamepad2, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
      ${scrolled ? "backdrop-blur-lg bg-[#5b3a29]/90 shadow-lg py-2" : "bg-[#5b3a29] py-3"}
      text-white px-6`}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg sm:text-xl hover:opacity-90 transition"
        >
          <Gamepad2 className="text-[#fefae0]" size={26} />
          <span className="tracking-wide font-serif">Gami</span>
        </Link>

        {/* Nút menu (mobile) */}
        <button
          className="sm:hidden text-[#fefae0] hover:text-[#e6ccb2] transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden sm:flex gap-8 items-center text-base font-medium">
          <Link href="/" className="relative group">
            Trang chủ
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#e6ccb2] transition-all duration-300"></span>
          </Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="relative group">
                Đăng nhập
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#e6ccb2] transition-all duration-300"></span>
              </Link>

              <Link href="/register" className="relative group">
                Đăng ký
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#e6ccb2] transition-all duration-300"></span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-1 hover:opacity-80 transition"
              >
                <User size={18} /> Hồ sơ
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:opacity-80 transition"
              >
                <LogOut size={18} /> Đăng xuất
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div
          className="flex flex-col sm:hidden mt-3 gap-3 bg-[#6d4b3b]/95 
          backdrop-blur-md rounded-lg p-4 border border-[#8c6746]/50 
          animate-slideDown"
        >
          <Link
            href="/"
            className="text-[#fefae0] hover:text-[#e6ccb2] text-lg transition"
            onClick={() => setOpen(false)}
          >
            Trang chủ
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-[#fefae0] hover:text-[#e6ccb2] text-lg transition"
                onClick={() => setOpen(false)}
              >
                Đăng nhập
              </Link>

              <Link
                href="/register"
                className="text-[#fefae0] hover:text-[#e6ccb2] text-lg transition"
                onClick={() => setOpen(false)}
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="text-[#fefae0] hover:text-[#e6ccb2] text-lg transition flex items-center gap-1"
                onClick={() => setOpen(false)}
              >
                <User size={18} /> Hồ sơ
              </Link>

              <button
                onClick={handleLogout}
                className="text-[#fefae0] hover:text-[#e6ccb2] text-lg transition flex items-center gap-1"
              >
                <LogOut size={18} /> Đăng xuất
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
