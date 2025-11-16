"use client";

import Link from "next/link";
import { ArrowLeft, Home, Users, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

interface GameNavbarProps {
  gameName: string;
  gameIcon: string;
}

export default function GameNavbar({ gameName, gameIcon }: GameNavbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hiện navbar khi cuộn xuống, ẩn khi cuộn lên
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

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-linear-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-lg text-white flex items-center justify-between px-4 py-3 shadow-lg z-50 border-b border-cyan-500/30 transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      {/* Left: Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold hidden sm:inline">Trang chủ</span>
      </Link>

      {/* Center: Game title */}
      <h1 className="font-serif text-xl sm:text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow text-center flex-1 mx-4">
        {gameIcon} {gameName}
      </h1>

      {/* Right: Game menu */}
      <div className="hidden sm:flex items-center gap-2">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-blue-900/50 transition text-sm font-semibold"
        >
          <Users size={18} />
          Hồ sơ
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-lg hover:bg-blue-900/50 transition text-sm font-semibold"
        >
          <Trophy size={18} />
          Xếp hạng
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="sm:hidden text-cyan-400 hover:text-cyan-300 transition"
      >
        {showMenu ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {showMenu && (
        <div className="absolute top-14 right-0 bg-blue-900/90 backdrop-blur-md rounded-lg shadow-xl p-4 w-48 border border-cyan-500/30">
          <Link
            href="/profile"
            className="block text-gray-300 hover:text-cyan-400 py-2 px-3 rounded hover:bg-blue-800 transition font-semibold"
          >
            👤 Hồ sơ
          </Link>
          <Link
            href="/"
            className="block text-gray-300 hover:text-cyan-400 py-2 px-3 rounded hover:bg-blue-800 transition font-semibold"
          >
            🏆 Xếp hạng
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-300 hover:text-cyan-400 py-2 px-3 rounded hover:bg-blue-800 transition font-semibold"
          >
            📞 Liên hệ
          </a>
        </div>
      )}
    </nav>
  );
}
