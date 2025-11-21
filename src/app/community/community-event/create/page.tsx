"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Link2, Users } from "lucide-react";

export default function CreateCommunityEventPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/community/events/create" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 text-lg font-semibold">
          <ArrowLeft className="w-6 h-6" /> Quay lại
        </Link>

        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-8 ring-purple-400/50">
            <Calendar className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent mb-4">
            TẠO SỰ KIỆN CỘNG ĐỒNG
          </h1>
        </div>

        <form className="space-y-8">
          <input type="text" placeholder="Tên sự kiện (Livestream, Workshop, AMA...)" className="w-full bg-slate-800/70 border-2 border-purple-500/40 rounded-3xl px-8 py-8 text-2xl text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none" />

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-slate-900/70 p-8 rounded-3xl border border-purple-500/40">
              <label className="flex items-center gap-3 text-xl text-purple-300 mb-4"><Calendar className="w-8 h-8" /> Ngày & Giờ</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="bg-slate-800/70 border border-purple-500/40 rounded-2xl px-6 py-5 text-white" />
                <input type="time" className="bg-slate-800/70 border border-purple-500/40 rounded-2xl px-6 py-5 text-white" />
              </div>
            </div>
            <div className="bg-slate-900/70 p-8 rounded-3xl border border-purple-500/40">
              <label className="flex items-center gap-3 text-xl text-purple-300 mb-4"><Link2 className="w-8 h-8" /> Link tham gia</label>
              <input type="url" placeholder="Zoom, Discord, YouTube..." className="w-full bg-slate-800/70 border border-purple-500/40 rounded-2xl px-6 py-5 text-white" />
            </div>
          </div>

          <textarea placeholder="Mô tả chi tiết sự kiện..." rows={6} className="w-full bg-slate-800/70 border-2 border-purple-500/40 rounded-3xl px-8 py-8 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none text-lg"></textarea>

          <div className="text-center">
  <button
    className="group inline-flex items-center gap-4 px-12 py-6
               bg-gradient-to-r from-purple-500 to-pink-600
               hover:from-purple-600 hover:to-pink-700
               text-white text-2xl font-bold
               rounded-2xl shadow-2xl shadow-purple-600/50
               transition-all transform hover:scale-105"
  >
    <Calendar className="w-10 h-10" />
    TẠO SỰ KIỆN
  </button>
</div>

        </form>
      </div>
    </div>
  );
}