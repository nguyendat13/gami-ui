"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLeaderboard, LeaderboardEntry } from "@/lib/userService";
import { Trophy, Crown, Medal } from "lucide-react";

// ĐÃ THÊM INTERFACE GAME TẠI ĐÂY → FIX LỖI "Cannot find name 'Game'"
interface Game {
  id: string;
  name: string;
}

interface LiveLeaderboardMiniProps {
  activeGame: string;
  games: Game[];
  setActiveGame: (id: string) => void;
}

export default function LiveLeaderboardMini({ activeGame, games, setActiveGame }: LiveLeaderboardMiniProps) {
  const [top3, setTop3] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop3 = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await getLeaderboard(activeGame, token);
        setTop3(data.slice(0, 3));
      } catch (err) {
        console.error("Lỗi load leaderboard mini:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTop3();
  }, [activeGame]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-cyan-300 animate-pulse">Đang tải cao thủ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">

    {/* Chọn Game – nhỏ hơn */}
<div className="flex flex-wrap justify-center gap-4 mb-8">
  {games.map((game) => (
    <button
      key={game.id}
      onClick={() => setActiveGame(game.id)}
      className={`relative px-6 py-3 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-md overflow-hidden ${
        activeGame === game.id
          ? "bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/50 ring-2 ring-cyan-300/40"
          : "bg-slate-800/90 border-2 border-cyan-500/40 text-cyan-300 hover:border-cyan-400"
      }`}
    >
      <span className="relative z-10 drop-shadow-lg">{game.name}</span>
      {activeGame === game.id && (
        <div className="absolute inset-0 bg-white/20 animate-ping rounded-2xl"></div>
      )}
    </button>
  ))}
</div>

{/* Top 3 Podium – nhỏ lại */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {top3.map((player, idx) => {
    const rank = player.rank;
    const heightClass = rank === 1 ? "h-64" : rank === 2 ? "h-56" : "h-48"; // giảm chiều cao
    const bg = rank === 1 ? "bg-linear-to-br from-cyan-500 to-blue-700" :
               rank === 2 ? "bg-linear-to-br from-slate-600 to-slate-700" :
                           "bg-linear-to-br from-orange-500 to-red-700";

    return (
      <div key={player.userId} className={`relative group ${rank === 1 ? "md:mt-0" : "md:-mt-4"}`}>
        <div className={`relative ${bg} ${heightClass} rounded-2xl shadow-xl border-2 border-white/20 overflow-hidden transition-all group-hover:scale-105`}>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>

          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
            {rank === 1 && <Crown className="w-16 h-16 text-yellow-400 drop-shadow-lg animate-pulse" />}
            {rank === 2 && <Medal className="w-12 h-12 text-gray-300 drop-shadow-lg" />}
            {rank === 3 && <Medal className="w-12 h-12 text-orange-400 drop-shadow-lg" />}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <div className="w-20 h-20 mx-auto bg-linear-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-md ring-4 ring-white/20 mb-4">
              {player.username[0].toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{player.username}</h3>
            <p className="text-sm text-gray-300 mb-2">{player.fullName || "Ẩn danh"}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-cyan-300">{player.wins}</p>
              <p className="text-xl text-green-400 font-semibold">{player.winRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

{/* Nút Xem Đầy Đủ – giữ nhỏ */}
<div className="text-center mt-8">
  <Link
    href="/leaderboard"
    className="group inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-xl shadow-md shadow-cyan-600/40 transition-all transform hover:scale-105"
  >
    <Trophy className="w-5 h-5 text-yellow-300 group-hover:animate-bounce" />
    XEM BẢNG XẾP HẠNG
    <Trophy className="w-5 h-5 text-yellow-300 group-hover:animate-bounce" />
  </Link>
</div>


    </div>
  );
}