"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserId } from "@/utils/token";
import { User, UserStats, RecentGame, getUserById, getUserStats, getRecentGames } from "@/lib/userService";
import { Trophy, Users } from "lucide-react";

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalGamesPlayed: 0,
    totalWins: 0,
    totalLosses: 0,
    totalWinRate: 0,
    gamesByType: [],
  });
  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserId();
        if (!userId) throw new Error("Không tìm thấy user ID");
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Không có token");

        const [userData, statsData, recent] = await Promise.all([
          getUserById(userId, token),
          getUserStats(userId, token),
          getRecentGames(userId, token),
        ]);

        setUser(userData);
        setStats(statsData);
        setRecentGames(recent);
      } catch (err: any) {
        alert("Lỗi: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-2xl text-gray-300">Đang tải...</p>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-10">
      <div className="bg-black/60 rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#c19a6b]">🎮 Trang Người Chơi</h1>
          <Link href="/profile" className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition">
            Hồ sơ cá nhân
          </Link>
        </div>

        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Thông tin cá nhân */}
            <div className="bg-linear-to-br from-indigo-600 to-indigo-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">👤 Thông tin cá nhân</h2>
              <div className="space-y-3">
                <p className="text-lg"><span className="font-semibold">Username:</span> {user.username}</p>
                <p className="text-lg"><span className="font-semibold">Tên:</span> {user.fullName}</p>
                <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-lg"><span className="font-semibold">Số điện thoại:</span> {user.phone}</p>
              </div>
            </div>

            {/* Thống kê */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#c19a6b] mb-4">📊 Thống kê</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Trò chơi</p>
                  <p className="text-3xl font-bold">{stats.totalGamesPlayed}</p>
                </div>
                <div className="bg-green-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Thắng</p>
                  <p className="text-3xl font-bold text-yellow-300">{stats.totalWins}</p>
                </div>
                <div className="bg-red-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Thua</p>
                  <p className="text-3xl font-bold">{stats.totalLosses}</p>
                </div>
                <div className="bg-purple-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Tỷ lệ thắng</p>
                  <p className="text-3xl font-bold">{stats.totalWinRate}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
  href="/community" 
  className="group relative bg-gradient-to-br from-cyan-600 via-blue-700 to-cyan-800 
             p-10 rounded-2xl text-center shadow-2xl 
             hover:shadow-cyan-500/50 hover:shadow-2xl 
             transition-all duration-300 transform hover:scale-110 
             overflow-hidden border-2 border-cyan-500/30"
>
  {/* Hiệu ứng sáng lấp lánh khi hover */}
  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  {/* Icon Cộng Đồng + hiệu ứng rung nhẹ */}
  <div className="text-7xl mb-4">
    <Users className="inline-block text-cyan-300 drop-shadow-2xl group-hover:animate-bounce" />
  </div>

  {/* Tiêu đề gradient siêu sang */}
  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-white to-cyan-300 
                 bg-clip-text text-transparent mb-2 tracking-wider">
    CỘNG ĐỒNG
  </h3>

  <p className="text-gray-200 text-sm font-medium tracking-wide">
    Kết nối cao thủ • Chia sẻ chiến lược • Lên Top cùng nhau!
  </p>

  {/* Hiệu ứng tia sáng nhỏ khi hover */}
  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
    <span className="text-5xl animate-ping">✦</span>
  </div>
</Link>
          <Link href="/profile" className="bg-linear-to-br from-blue-600 to-blue-800 p-8 rounded-lg text-center hover:shadow-xl transition transform hover:scale-105">
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="text-2xl font-bold">Cài đặt</h3>
            <p className="text-sm mt-2 text-gray-200">Quản lý hồ sơ cá nhân</p>
          </Link>
         {/* BẢNG XẾP HẠNG - NÚT SIÊU ĐẸP */}
<Link 
  href="/leaderboard"
  className="group relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 
             p-10 rounded-2xl text-center shadow-2xl 
             hover:shadow-purple-500/50 hover:shadow-2xl 
             transition-all duration-300 transform hover:scale-110 
             overflow-hidden border border-purple-500/30"
>
  {/* Hiệu ứng sáng lấp lánh khi hover */}
  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  {/* Icon + hiệu ứng nhấp nháy nhẹ */}
  <div className="text-7xl mb-4 animate-pulse">
    <Trophy className="inline-block text-yellow-400 drop-shadow-2xl" />
  </div>

  {/* Tiêu đề gradient siêu chất */}
  <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 
                 bg-clip-text text-transparent mb-2">
    BẢNG XẾP HẠNG
  </h3>

  {/* Hiệu ứng ngôi sao nhỏ bay khi hover */}
  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-700">
    <span className="text-4xl animate-ping">✦</span>
  </div>
</Link>
        </div>

        {/* Trò chơi gần đây */}
        <div className="bg-black/40 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#c19a6b] mb-4">📋 Trò chơi gần đây</h2>
          <div className="space-y-3">
            {recentGames.map(game => (
              <div key={game.gameId} className="flex justify-between items-center bg-black/30 p-4 rounded-lg">
                <div>
                  <p className="font-semibold">Vs. {game.opponent}</p>
                  <p className="text-sm text-gray-400">{new Date(game.playedAt).toLocaleString()}</p>
                </div>
                <span className={`${game.result === "Thắng" ? "bg-green-600" : "bg-red-600"} px-4 py-2 rounded font-bold`}>
                  {game.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
