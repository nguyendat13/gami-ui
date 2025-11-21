"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Calendar, Users, Clock, Award, Gamepad2, ChevronRight, Crown, Medal } from "lucide-react";

export default function CreateTournamentPage() {
  const [formData, setFormData] = useState({
    name: "",
    game: "caro",
    format: "1v1",
    maxPlayers: 64,
    startDate: "",
    startTime: "",
    prize: "",
    description: "",
    rules: "",
  });

  const games = [
    { id: "caro", name: "Caro", icon: "🎯" },
    { id: "chess", name: "Cờ Vua", icon: "♔" },
    { id: "gomoku", name: "Gomoku", icon: "⚫" },
    { id: "oanquan", name: "Ô Ăn Quan", icon: "🎪" },
  ];

  const formats = [
    { id: "1v1", name: "1 vs 1 (Loại trực tiếp)" },
    { id: "roundrobin", name: "Vòng tròn" },
    { id: "swiss", name: "Thụy Sĩ" },
    { id: "team", name: "Đồng đội 2v2" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Giải đấu đã được tạo thành công! Đang chờ duyệt...");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-yellow-950 to-slate-950 text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/community/events/create" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 text-lg font-semibold">
            <ArrowLeft className="w-6 h-6" /> Quay lại Hub Sự Kiện
          </Link>

          <div className="flex items-center justify-center gap-8 mb-8">
            <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-2xl animate-pulse" />
            <h1 className="text-7xl md:text-8xl font-bold bg-linear-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              TẠO GIẢI ĐẤU
            </h1>
            <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-2xl animate-pulse" />
          </div>
          <p className="text-3xl text-yellow-300 max-w-4xl mx-auto font-light">
            Tổ chức giải đấu chuyên nghiệp • Bracket tự động • Phần thưởng hấp dẫn • Live ranking!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* Tên giải đấu */}
          <div className="bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-12 rounded-3xl border-4 border-yellow-500/50 shadow-3xl shadow-yellow-600/40">
            <label className="text-3xl font-bold text-yellow-300 mb-6 block flex items-center gap-4">
              <Crown className="w-12 h-12" /> Tên Giải Đấu
            </label>
            <input
              type="text"
              required
              placeholder="VD: Giải Caro Vô Địch Thế Giới 2025"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-800/80 border-4 border-yellow-500/60 rounded-3xl px-10 py-8 text-3xl text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition shadow-2xl"
            />
          </div>

          {/* Game + Format */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Chọn Game */}
            <div className="bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-12 rounded-3xl border-4 border-yellow-500/50 shadow-3xl">
              <label className="text-3xl font-bold text-yellow-300 mb-8 block flex items-center gap-4">
                <Gamepad2 className="w-12 h-12" /> Trò Chơi
              </label>
              <div className="grid grid-cols-2 gap-6">
                {games.map((game) => (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, game: game.id })}
                    className={`relative p-10 rounded-3xl font-bold text-4xl transition-all transform hover:scale-110 shadow-2xl overflow-hidden ${
                      formData.game === game.id
                        ? "bg-linear-to-r from-yellow-500 to-orange-600 text-white ring-8 ring-yellow-300 shadow-yellow-500/70"
                        : "bg-slate-800/80 border-4 border-yellow-500/40 text-yellow-300 hover:border-yellow-400"
                    }`}
                  >
                    <span className="drop-shadow-2xl">{game.icon}</span>
                    <p className="text-lg mt-4">{game.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Thể thức */}
            <div className="bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-12 rounded-3xl border-4 border-yellow-500/50 shadow-3xl">
              <label className="text-3xl font-bold text-yellow-300 mb-8 block flex items-center gap-4">
                <Trophy className="w-12 h-12" /> Thể Thức Thi Đấu
              </label>
              <div className="space-y-6">
                {formats.map((fmt) => (
                  <label key={fmt.id} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-800/70 hover:bg-yellow-900/40 cursor-pointer transition border-4 border-yellow-500/30 hover:border-yellow-400">
                    <input
                      type="radio"
                      name="format"
                      value={fmt.id}
                      checked={formData.format === fmt.id}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="w-10 h-10 text-yellow-500"
                    />
                    <span className="text-2xl font-bold text-white">{fmt.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-10 rounded-3xl border-4 border-yellow-500/50 shadow-3xl">
              <label className="text-2xl font-bold text-yellow-300 mb-6 block flex items-center gap-4">
                <Users className="w-10 h-10" /> Số Người Tham Gia
              </label>
              <select
                value={formData.maxPlayers}
                onChange={(e) => setFormData({ ...formData, maxPlayers: Number(e.target.value) })}
                className="w-full bg-slate-800/80 border-4 border-yellow-500/60 rounded-3xl px-8 py-8 text-3xl text-white focus:border-yellow-400 focus:outline-none"
              >
                {[8, 16, 32, 64, 128, 256, 512].map(n => (
                  <option key={n} value={n}>{n} người</option>
                ))}
              </select>
            </div>

            <div className="bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-10 rounded-3xl border-4 border-yellow-500/50 shadow-3xl">
              <label className="text-2xl font-bold text-yellow-300 mb-6 block flex items-center gap-4">
                <Calendar className="w-10 h-10" /> Ngày Khai Mạc
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-800/80 border-4 border-yellow-500/60 rounded-3xl px-8 py-8 text-2xl text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>

            <div className="bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-10 rounded-3xl border-4 border-yellow-500/50 shadow-3xl">
              <label className="text-2xl font-bold text-yellow-300 mb-6 block flex items-center gap-4">
                <Clock className="w-10 h-10" /> Giờ Bắt Đầu
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full bg-slate-800/80 border-4 border-yellow-500/60 rounded-3xl px-8 py-8 text-2xl text-white focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Phần thưởng + Mô tả + Luật */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-orange-900/60 to-red-900/60 p-10 rounded-3xl border-4 border-orange-500/60 shadow-3xl">
              <label className="text-2xl font-bold text-orange-300 mb-6 block flex items-center gap-4">
                <Award className="w-12 h-12" /> Phần Thưởng
              </label>
              <textarea
                placeholder="Top 1: 10.000.000 VNĐ + Huy hiệu Vô địch..."
                rows={6}
                value={formData.prize}
                onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                className="w-full bg-slate-800/80 border-4 border-orange-500/60 rounded-3xl px-8 py-6 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none text-lg"
              />
            </div>

            <div className="lg:col-span-2 bg-linear-to-br from-slate-900/80 to-yellow-900/40 p-10 rounded-3xl border-4 border-yellow-500/50 shadow-3xl">
              <label className="text-2xl font-bold text-yellow-300 mb-6 block flex items-center gap-4">
                <Trophy className="w-12 h-12" /> Mô Tả & Luật Chơi
              </label>
              <textarea
                required
                placeholder="Mô tả giải đấu, luật chơi chi tiết..."
                rows={10}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-800/80 border-4 border-yellow-500/60 rounded-3xl px-8 py-6 text-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

                  {/* Submit Button – HOÀNH TRÁNG NHƯNG VỪA VẶN, KHÔNG BỊ TO QUÁ MỨC */}
         <div className="text-center pt-16">
  <button
    type="submit"
    className="group relative inline-flex items-center gap-4 px-12 py-6 
               bg-linear-to-r from-yellow-500 via-orange-500 to-red-600 
               hover:from-yellow-600 hover:via-orange-600 hover:to-red-700 
               text-white text-2xl font-bold rounded-full 
               shadow-xl shadow-orange-600/50 
               transition-all duration-300 transform hover:scale-105 
               hover:shadow-orange-500/80 overflow-hidden
               border-4 border-yellow-400/50"
  >
    {/* Hiệu ứng sáng */}
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Icon trái */}
    <Trophy className="w-10 h-10 text-yellow-300 group-hover:animate-bounce drop-shadow-xl" />

    {/* Text */}
    <span className="relative z-10 drop-shadow-lg tracking-wide">
      TẠO GIẢI ĐẤU NGAY
    </span>

    {/* Icon phải */}
    <Trophy className="w-10 h-10 text-yellow-300 group-hover:animate-bounce drop-shadow-xl" />

    {/* Arrow */}
    <ChevronRight className="w-8 h-8 text-yellow-300 group-hover:translate-x-3 transition-transform duration-300" />
  </button>
</div>

        </form>
      </div>
    </div>
  );
}