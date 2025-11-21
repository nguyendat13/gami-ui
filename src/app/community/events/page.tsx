"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Trophy, Users, ChevronRight, Sparkles } from "lucide-react";

interface Event {
  id: string;
  title: string;
  game: string;
  type: "tournament" | "update" | "community" | "recruit" | "guide";
  date: string;
  image: string;
  participants?: number;
  prize?: string;
  tag: string;
  status: "live" | "upcoming" | "ended";
}

export default function CaroEventsRiotStyle() {
  const [filter, setFilter] = useState<"all" | "live" | "upcoming">("all");

  const events: Event[] = [
    {
      id: "1",
      title: "GIẢI CARO VÔ ĐỊCH TOÀN QUỐC 2025",
      game: "Caro",
      type: "tournament",
      date: "28-30/12/2025",
      image: "bg-[url('/events/caro-championship.jpg')] bg-cover",
      participants: 1024,
      prize: "200.000.000 VNĐ + Huy hiệu Vĩnh cửu",
      tag: "CHUNG KẾT QUỐC GIA",
      status: "upcoming",
    },
    {
      id: "2",
      title: "CẬP NHẬT PHIÊN BẢN 3.0 - THÊM GOMOKU & Ô ĂN QUAN",
      game: "Tất cả",
      type: "update",
      date: "Ra mắt hôm nay",
      image: "bg-[url('/events/update-3.0.jpg')] bg-cover",
      tag: "NEW UPDATE",
      status: "live",
    },
    {
      id: "3",
      title: "CARO MASTERS TOURNAMENT - TOP 128 VIỆT NAM",
      game: "Caro",
      type: "tournament",
      date: "15/12/2025",
      image: "bg-[url('/events/masters.jpg')] bg-cover",
      participants: 128,
      prize: "50.000.000 VNĐ + Skin Đặc biệt",
      tag: "MASTERS SERIES",
      status: "upcoming",
    },
    {
      id: "4",
      title: "LIVESTREAM AMA VỚI TOP 1 CARO VIỆT NAM - DRAGONKING",
      game: "Caro",
      type: "community",
      date: "Tối nay 21:00",
      image: "bg-[url('/events/ama-dragonking.jpg')] bg-cover",
      participants: 3421,
      tag: "LIVESTREAM",
      status: "live",
    },
    {
      id: "5",
      title: "TUYỂN THÀNH VIÊN CLAN [VUA CARO] - RANK MASTER+",
      game: "Caro",
      type: "recruit",
      date: "Đang tuyển",
      image: "bg-[url('/events/clan-vuacaro.jpg')] bg-cover",
      participants: 156,
      tag: "CLAN RECRUIT",
      status: "live",
    },
    {
      id: "6",
      title: "HƯỚNG DẪN CARO TỪ A-Z - BÍ KÍP LÊN MASTER TRONG 7 NGÀY",
      game: "Caro",
      type: "guide",
      date: "Mới đăng",
      image: "bg-[url('/events/guide-master.jpg')] bg-cover",
      participants: 12894,
      tag: "HƯỚNG DẪN",
      status: "live",
    },
  ];

  const filtered = filter === "all" ? events : events.filter(e => e.status === filter);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Riot Hero – Việt Nam Style */}
      <div className="relative h-[50vh] bg-gradient-to-b from-red-950/80 via-black to-black">
        <div className="absolute inset-0 bg-[url('/events/hero-caro.jpg')] bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="flex items-center gap-4 mb-4">
            <Sparkles className="w-12 h-12 text-red-500 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
              SỰ KIỆN CARO
            </h1>
            <Sparkles className="w-12 h-12 text-red-500 animate-pulse" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4 tracking-widest">
            VUA CARO VIỆT NAM
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700"></div>
      </div>

      {/* Filter */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b-2 border-red-600 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-6">
          {(["all", "live", "upcoming"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-2 text-lg md:text-xl font-black uppercase tracking-widest transition-all ${
                filter === f ? "text-red-500 shadow-lg shadow-red-600/50" : "text-gray-500 hover:text-white"
              }`}
            >
              {f === "all" ? "TẤT CẢ" : f === "live" ? "ĐANG HOT" : "SẮP DIỄN RA"}
              {filter === f && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-yellow-500"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid – nhỏ gọn */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="group relative bg-gradient-to-br from-gray-950 to-black rounded-xl overflow-hidden border-2 border-gray-800 hover:border-red-600 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 transform hover:-translate-y-2"
            >
              <div className={`h-64 ${event.image || "bg-gradient-to-br from-red-900 to-black"} bg-cover bg-center relative`}>
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition"></div>

                <div className="absolute top-2 left-2">
                  <span className="px-3 py-1 bg-red-600 text-white font-black text-sm uppercase tracking-wider rounded shadow-md">
                    {event.tag}
                  </span>
                </div>

                {event.status === "live" && (
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                    <span className="text-sm font-black text-red-500">LIVE</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-red-400 transition">
                  {event.title}
                </h3>
                <p className="text-lg text-yellow-400 font-bold mb-4">{event.game}</p>

                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span className="font-bold">{event.date}</span>
                  </div>
                  {event.prize && (
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-yellow-400">{event.prize}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/community/events/${event.id}`}
                    className="group/btn px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-black text-sm md:text-base rounded-lg transition-all transform hover:scale-105 shadow-md shadow-red-600/50"
                  >
                    THAM GIA NGAY
                    <ChevronRight className="inline-block ml-1 group-hover/btn:translate-x-1 transition" />
                  </Link>

                  {event.participants && (
                    <div className="flex items-center gap-1 text-gray-300 text-sm">
                      <Users className="w-4 h-4" />
                      <span className="font-bold">{event.participants.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-3 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700"></div>
    </div>
  );
}
