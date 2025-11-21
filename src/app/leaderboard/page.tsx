"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLeaderboard } from "@/lib/userService";
import { ArrowLeft, Trophy, Crown, Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  fullName?: string | null;
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Vui lòng đăng nhập");

        const userData = localStorage.getItem("user");
        if (userData) {
          const parsed = JSON.parse(userData);
          setCurrentUserId(parsed.userId?.toString() || "");
        }

        const data = await getLeaderboard("caro", token);
        setLeaderboard(data);
      } catch (err: any) {
        alert(err.message || "Không tải được bảng xếp hạng");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const isCurrentUser = (userId: string) => userId === currentUserId;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <p className="text-3xl text-cyan-300 animate-pulse">Đang tải bảng xếp hạng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header - Blue Style */}
        <div className="text-center mb-16">
          <Link href="/auth/user" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 text-lg font-semibold">
            <ArrowLeft className="w-6 h-6" /> Quay lại
          </Link>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent flex items-center justify-center gap-6">
            <Trophy className="w-20 h-20 text-cyan-400 drop-shadow-2xl" />
            BẢNG XẾP HẠNG
            <Trophy className="w-20 h-20 text-cyan-400 drop-shadow-2xl" />
          </h1>
          <p className="text-2xl text-cyan-300 mt-6 font-light">Trò chơi: Caro • Top 100 Cao Thủ</p>
        </div>

        {/* Highlight bản thân */}
        {currentUserId && leaderboard.find(p => p.userId === currentUserId) && (
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-700 px-12 py-6 rounded-2xl shadow-2xl shadow-cyan-500/50 border border-cyan-400">
              <p className="text-4xl font-bold text-white animate-pulse">
                ★ HẠNG CỦA BẠN: #{leaderboard.find(p => p.userId === currentUserId)?.rank} ★
              </p>
              <p className="text-xl text-cyan-200 mt-2">
                Win Rate: {leaderboard.find(p => p.userId === currentUserId)?.winRate.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* Top 3 Podium - Blue Luxury */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 0, 2].map((pos) => {
              const player = leaderboard[pos];
              if (!player) return null;

              const rankColors = [
                "from-cyan-500 to-blue-600 border-cyan-400 shadow-cyan-500/50",
                "from-slate-500 to-slate-600 border-slate-400",
                "from-orange-500 to-red-600 border-orange-400"
              ];

              return (
                <div
                  key={player.userId}
                  className={`relative group transform transition-all hover:scale-110 ${
                    player.rank === 1 ? "md:-mt-12" : ""
                  } ${isCurrentUser(player.userId) ? "ring-8 ring-yellow-400 ring-offset-8 ring-offset-slate-950/50" : ""}`}
                >
                  <div className={`relative bg-gradient-to-br ${rankColors[pos]} rounded-3xl p-10 shadow-3xl border-4 overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition"></div>

                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      {player.rank === 1 && <Crown className="w-20 h-20 text-yellow-400 drop-shadow-2xl" />}
                      {player.rank === 2 && <Medal className="w-16 h-16 text-gray-300 drop-shadow-2xl" />}
                      {player.rank === 3 && <Medal className="w-16 h-16 text-orange-500 drop-shadow-2xl" />}
                    </div>

                    <div className="text-center pt-12">
                      <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl font-bold shadow-2xl mb-6 ring-4 ring-white/30 ${
                        isCurrentUser(player.userId) ? "bg-yellow-500 text-black ring-yellow-300" : "bg-gradient-to-br from-cyan-400 to-blue-600"
                      }`}>
                        {player.username[0].toUpperCase()}
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2">{player.username}</h3>
                      <p className="text-lg text-cyan-200 mb-8">{player.fullName || "Ẩn danh"}</p>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                          <p className="text-4xl font-bold text-green-400">{player.wins}</p>
                          <p className="text-sm text-gray-300">Thắng</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                          <p className="text-4xl font-bold text-yellow-300">{player.winRate.toFixed(1)}%</p>
                          <p className="text-sm text-gray-300">Win Rate</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                          <p className="text-4xl font-bold text-blue-300">{player.totalGames}</p>
                          <p className="text-sm text-gray-300">Trận</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full Table - Blue Community Style */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-cyan-900/70 to-blue-900/70 border-b border-cyan-500/40">
            <h2 className="text-4xl font-bold text-center text-cyan-300">
              TOP 100 CAO THỦ CARO
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-cyan-400 border-b border-cyan-500/30 text-lg">
                  <th className="px-8 py-6 text-left">Hạng</th>
                  <th className="px-8 py-6 text-left">Người Chơi</th>
                  <th className="px-8 py-6 text-center">Trận</th>
                  <th className="px-8 py-6 text-center">Thắng</th>
                  <th className="px-8 py-6 text-center">Thua</th>
                  <th className="px-8 py-6 text-center">Hòa</th>
                  <th className="px-8 py-6 text-center">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player) => (
                  <tr
                    key={player.userId}
                    className={`border-b border-cyan-500/10 transition-all ${
                      isCurrentUser(player.userId)
                        ? "bg-gradient-to-r from-cyan-900/50 to-blue-900/50 shadow-2xl shadow-cyan-500/30"
                        : "hover:bg-cyan-900/20"
                    }`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        {player.rank <= 3 ? (
                          <div className="text-4xl">
                            {player.rank === 1 && <Crown className="text-yellow-400 drop-shadow-lg" />}
                            {player.rank === 2 && <Medal className="text-gray-300 drop-shadow-lg" />}
                            {player.rank === 3 && <Medal className="text-orange-500 drop-shadow-lg" />}
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-cyan-300">#{player.rank}</span>
                        )}
                        {isCurrentUser(player.userId) && <span className="text-yellow-400 font-bold ml-2">← BẠN</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl ${
                          isCurrentUser(player.userId)
                            ? "bg-yellow-500 text-black ring-4 ring-yellow-300"
                            : "bg-gradient-to-br from-cyan-500 to-blue-600"
                        }`}>
                          {player.username[0].toUpperCase()}
                        </div>
                        <div>
                          <p className={`font-bold text-xl ${isCurrentUser(player.userId) ? "text-yellow-300" : "text-white"}`}>
                            {player.username} {isCurrentUser(player.userId) && "(Bạn)"}
                          </p>
                          <p className="text-sm text-gray-400">{player.fullName || "-"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center text-blue-300 font-bold text-xl">{player.totalGames}</td>
                    <td className="px-8 py-6 text-center text-green-400 font-bold text-xl">{player.wins}</td>
                    <td className="px-8 py-6 text-center text-red-400 font-bold text-xl">{player.losses}</td>
                    <td className="px-8 py-6 text-center text-yellow-400 font-bold text-xl">{player.draws}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={`text-3xl font-bold ${
                        player.winRate >= 70 ? "text-yellow-400" :
                        player.winRate >= 50 ? "text-green-400" : "text-gray-400"
                      }`}>
                        {player.winRate.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12 text-cyan-400/70 text-lg">
          Cập nhật lúc: {new Date().toLocaleString("vi-VN")}
        </div>
      </div>
    </div>
  );
}