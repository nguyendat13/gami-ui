"use client";

import Link from "next/link";
import { ArrowLeft, Megaphone, Bell, Pin, Timer } from "lucide-react";

export default function CreateAnnouncementPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-red-950 to-slate-950 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/community/events/create" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-8 text-lg font-semibold">
          <ArrowLeft className="w-6 h-6" /> Quay lại
        </Link>

        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-8 ring-red-400/50 animate-pulse">
            <Megaphone className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-linear-to-r from-red-400 via-rose-400 to-red-300 bg-clip-text text-transparent mb-4">
            TẠO THÔNG BÁO LỚN
          </h1>
        </div>

        <form className="space-y-8">
          <input type="text" placeholder="Tiêu đề thông báo (tối đa 100 ký tự)" className="w-full bg-slate-800/70 border-2 border-red-500/40 rounded-3xl px-8 py-8 text-3xl font-bold text-white placeholder-gray-500 focus:border-red-400 focus:outline-none" />

          <textarea placeholder="Nội dung thông báo..." rows={8} className="w-full bg-slate-800/70 border-2 border-red-500/40 rounded-3xl px-8 py-8 text-xl text-white placeholder-gray-500 focus:border-red-400 focus:outline-none"></textarea>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-red-900/50 p-6 rounded-2xl border border-red-500/40 text-center">
              <Bell className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="font-bold text-red-300">Push Notification</p>
              <p className="text-sm text-gray-400">Gửi đến tất cả người chơi</p>
            </div>
            <div className="bg-red-900/50 p-6 rounded-2xl border border-red-500/40 text-center">
              <Pin className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="font-bold text-red-300">Pin Top 24h</p>
              <p className="text-sm text-gray-400">Hiển thị đầu trang chủ</p>
            </div>
            <div className="bg-red-900/50 p-6 rounded-2xl border border-red-500/40 text-center">
              <Timer className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <p className="font-bold text-red-300">Tự động hết hạn</p>
              <p className="text-sm text-gray-400">Sau 1-7 ngày</p>
            </div>
          </div>

       <div className="text-center">
  <button
    className="group inline-flex items-center gap-4 px-12 py-6
               bg-gradient-to-r from-red-500 to-rose-600
               hover:from-red-600 hover:to-rose-700
               text-white text-2xl font-bold
               rounded-2xl shadow-2xl shadow-red-600/50
               transition-all transform hover:scale-105"
  >
    <Megaphone className="w-10 h-10 group-hover:rotate-12 transition" />
    PHÁT THÔNG BÁO
  </button>
</div>

        </form>
      </div>
    </div>
  );
}