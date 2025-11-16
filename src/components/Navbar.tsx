"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Gamepad2, LogOut, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar backdrop effect
      setScrolled(currentScrollY > 10);
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
      ${scrolled ? "backdrop-blur-lg bg-linear-to-r from-slate-900/95 to-blue-900/95 shadow-lg py-2 border-b border-cyan-500/30" : "bg-linear-to-r from-slate-900 to-blue-900 py-3 border-b border-cyan-500/30"}
      text-white px-6 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg sm:text-xl hover:opacity-90 transition"
        >
          <Gamepad2 className="text-cyan-400" size={26} />
          <span className="tracking-wide font-serif bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Gami</span>
        </Link>

        {/* Nút menu (mobile) */}
        <button
          className="sm:hidden text-cyan-400 hover:text-cyan-300 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden sm:flex gap-8 items-center text-base font-medium">
          {/* <Link href="/" className="relative group text-gray-300 hover:text-cyan-400 transition">
            Trang chủ
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-cyan-400 transition-all duration-300"></span>
          </Link> */}

          {!isLoggedIn ? (
            <>
              <Link href="/login" className="relative group text-gray-300 hover:text-cyan-400 transition">
                Đăng nhập
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-cyan-400 transition-all duration-300"></span>
              </Link>

              <Link href="/register" className="relative group text-gray-300 hover:text-cyan-400 transition">
                Đăng ký
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-cyan-400 transition-all duration-300"></span>
              </Link>
            </>
          ) : (
            <>
              {/* <Link
                href="/profile"
                className="flex items-center gap-1 hover:opacity-80 transition"
              >
                <User size={18} /> Hồ sơ
              </Link> */}
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
          className="flex flex-col sm:hidden mt-3 gap-3 bg-blue-900/80 backdrop-blur-md rounded-lg p-4 border border-cyan-500/50"
        >
          <Link
            href="/"
            className="text-cyan-300 hover:text-cyan-200 text-lg transition"
            onClick={() => setOpen(false)}
          >
            Trang chủ
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="text-cyan-300 hover:text-cyan-200 text-lg transition"
                onClick={() => setOpen(false)}
              >
                Đăng nhập
              </Link>

              <Link
                href="/register"
                className="text-cyan-300 hover:text-cyan-200 text-lg transition"
                onClick={() => setOpen(false)}
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              {/* <Link
                href="/profile"
                className="text-cyan-300 hover:text-cyan-200 text-lg transition flex items-center gap-1"
                onClick={() => setOpen(false)}
              >
                <User size={18} /> Hồ sơ
              </Link> */}

              <button
                onClick={handleLogout}
                className="text-cyan-300 hover:text-cyan-200 text-lg transition flex items-center gap-1"
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
