"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Globe, Volume2, Users, Shield, Plus, MessageCircle } from "lucide-react";

export default function CreateChatChannelPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPrivate: false,
    requireInvite: true,
    voiceEnabled: true,
    maxMembers: 100,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/community/events/create" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 text-lg font-semibold">
          <ArrowLeft className="w-6 h-6" /> Quay lại
        </Link>

        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-8 ring-cyan-400/50">
            <MessageCircle className="w-20 h-20 text-white" />
          </div>
          <h1 className="text-6xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            TẠO KÊNH CHAT MỚI
          </h1>
        </div>

        <form className="space-y-8">
          <div className="bg-linear-to-br from-slate-900/70 to-blue-900/70 p-10 rounded-3xl border border-cyan-500/40 shadow-2xl">
            <label className="text-2xl font-bold text-cyan-300 mb-6 block">Tên Kênh</label>
            <input
              type="text"
              placeholder="VD: Clan Vô Địch, Off-Topic, Voice Chat 18+..."
              className="w-full bg-slate-800/70 border-2 border-cyan-500/40 rounded-2xl px-8 py-6 text-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-linear-to-br from-slate-900/70 to-blue-900/70 p-10 rounded-3xl border border-cyan-500/40 shadow-2xl">
              <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8" /> Quyền Truy Cập
              </h3>
              <div className="space-y-6">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input type="radio" name="privacy" className="w-6 h-6 text-cyan-500" defaultChecked />
                  <span className="text-lg">Công khai - Ai cũng vào được</span>
                </label>
                <label className="flex items-center gap-4 cursor-pointer">
                  <input type="radio" name="privacy" className="w-6 h-6 text-cyan-500" />
                  <span className="text-lg flex items-center gap-3"><Lock className="w-6 h-6" /> Riêng tư - Chỉ thành viên được mời</span>
                </label>
              </div>
            </div>

            <div className="bg-linear-to-br from-slate-900/70 to-blue-900/70 p-10 rounded-3xl border border-cyan-500/40 shadow-2xl">
              <h3 className="text-xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
                <Volume2 className="w-8 h-8" /> Tính Năng
              </h3>
              <div className="space-y-6">
                <label className="flex items-center justify-between">
                  <span className="text-lg flex items-center gap-3"><Volume2 className="w-6 h-6" /> Voice Chat</span>
                  <input type="checkbox" className="w-8 h-8 text-cyan-500 rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-lg flex items-center gap-3"><Shield className="w-6 h-6" /> Moderator Tools</span>
                  <input type="checkbox" className="w-8 h-8 text-cyan-500 rounded" defaultChecked />
                </label>
              </div>
            </div>
          </div>

         <div className="text-center pt-10">
  <button
    className="group inline-flex items-center gap-4 px-12 py-6
               bg-gradient-to-r from-cyan-500 to-blue-600
               hover:from-cyan-600 hover:to-blue-700
               text-white text-2xl font-bold
               rounded-2xl shadow-2xl shadow-cyan-600/50
               transition-all transform hover:scale-105"
  >
    <Plus className="w-10 h-10 group-hover:rotate-90 transition" />
    TẠO KÊNH NGAY
  </button>
</div>

        </form>
      </div>
    </div>
  );
}