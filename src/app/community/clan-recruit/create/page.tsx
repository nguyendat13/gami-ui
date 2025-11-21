"use client";

import Link from "next/link";
import { ArrowLeft, Users, Shield, Trophy, Target } from "lucide-react";

export default function CreateClanRecruitPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-green-950 to-slate-950 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/community/events/create" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-8 text-lg font-semibold">
          <ArrowLeft className="w-6 h-6" /> Quay lại
        </Link>

        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-8 ring-green-400/50">
            <Users className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-linear-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent mb-4">
            TUYỂN THÀNH VIÊN CLAN
          </h1>
        </div>

        <form className="space-y-8">
          <input type="text" placeholder="Tên Clan" className="w-full bg-slate-800/70 border-2 border-green-500/40 rounded-3xl px-8 py-8 text-2xl text-white" />
          <textarea placeholder="Mô tả clan, mục tiêu, thành tích..." rows={5} className="w-full bg-slate-800/70 border-2 border-green-500/40 rounded-3xl px-8 py-8 text-white text-lg"></textarea>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="text-xl text-green-300 mb-4 block flex items-center gap-3"><Trophy className="w-8 h-8" /> Rank yêu cầu</label>
              <select className="w-full bg-slate-800/70 border-2 border-green-500/40 rounded-2xl px-8 py-6 text-xl text-white">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
                <option>Master</option>
              </select>
            </div>
            <div>
              <label className="text-xl text-green-300 mb-4 block flex items-center gap-3"><Target className="w-8 h-8" /> Vị trí cần tuyển</label>
              <input type="text" placeholder="Carry, Support, Mid..." className="w-full bg-slate-800/70 border-2 border-green-500/40 rounded-2xl px-8 py-6 text-xl text-white" />
            </div>
          </div>

         <div className="text-center">
  <button
    className="group inline-flex items-center gap-4 px-12 py-6
               bg-gradient-to-r from-green-500 to-emerald-600
               hover:from-green-600 hover:to-emerald-700
               text-white text-2xl font-bold
               rounded-2xl shadow-2xl shadow-green-600/50
               transition-all transform hover:scale-105"
  >
    <Users className="w-10 h-10" />
    ĐĂNG TUYỂN NGAY
  </button>
</div>

        </form>
      </div>
    </div>
  );
}