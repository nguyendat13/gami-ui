"use client";
import { useState, useEffect } from "react";
import { apiGet } from "@/utils/api";
import Link from "next/link";
import { getUserId } from "@/utils/token";

interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: number;
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = getUserId();
        if (!userId) throw new Error("Không tìm thấy user ID");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Không có token");

        const data = await apiGet(`/User/${userId}`, token);
        setUser(data);

        // Giả lập thống kê
        setStats({
          gamesPlayed: Math.floor(Math.random() * 50) + 5,
          wins: Math.floor(Math.random() * 30) + 2,
          losses: Math.floor(Math.random() * 20) + 1,
          winRate: Math.floor(Math.random() * 100),
        });
      } catch (err: any) {
        alert("Lỗi: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-300">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-10">
      <div className="bg-black/60 rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#c19a6b]">🎮 Trang Người Chơi</h1>
          <Link
            href="/profile"
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Hồ sơ cá nhân
          </Link>
        </div>

        {/* Thông tin cá nhân */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-linear-to-br from-indigo-600 to-indigo-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">👤 Thông tin cá nhân</h2>
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold">Username:</span> {user.username}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Tên:</span> {user.fullName}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Số điện thoại:</span> {user.phone}
                </p>
              </div>
            </div>

            {/* Thống kê */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#c19a6b] mb-4">📊 Thống kê</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Trò chơi</p>
                  <p className="text-3xl font-bold">{stats.gamesPlayed}</p>
                </div>
                <div className="bg-green-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Thắng</p>
                  <p className="text-3xl font-bold text-yellow-300">{stats.wins}</p>
                </div>
                <div className="bg-red-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Thua</p>
                  <p className="text-3xl font-bold">{stats.losses}</p>
                </div>
                <div className="bg-purple-600 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-200">Tỷ lệ thắng</p>
                  <p className="text-3xl font-bold">{stats.winRate}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/game/caro"
            className="bg-linear-to-br from-green-600 to-green-800 p-8 rounded-lg text-center hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-2">🎮</div>
            <h3 className="text-2xl font-bold">Chơi Caro</h3>
            <p className="text-sm mt-2 text-gray-200">Bắt đầu một ván chơi mới</p>
          </Link>

          <Link
            href="/profile"
            className="bg-linear-to-br from-blue-600 to-blue-800 p-8 rounded-lg text-center hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="text-2xl font-bold">Cài đặt</h3>
            <p className="text-sm mt-2 text-gray-200">Quản lý hồ sơ cá nhân</p>
          </Link>

          <button className="bg-linear-to-br from-purple-600 to-purple-800 p-8 rounded-lg text-center hover:shadow-xl transition transform hover:scale-105">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold">Bảng xếp hạng</h3>
            <p className="text-sm mt-2 text-gray-200">Xem tất cả người chơi</p>
          </button>
        </div>

        {/* Các trò chơi gần đây */}
        <div className="bg-black/40 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#c19a6b] mb-4">📋 Trò chơi gần đây</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-black/30 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Vs. Player123</p>
                <p className="text-sm text-gray-400">2 giờ trước</p>
              </div>
              <span className="bg-green-600 px-4 py-2 rounded font-bold">Thắng</span>
            </div>
            <div className="flex justify-between items-center bg-black/30 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Vs. GameMaster</p>
                <p className="text-sm text-gray-400">1 ngày trước</p>
              </div>
              <span className="bg-red-600 px-4 py-2 rounded font-bold">Thua</span>
            </div>
            <div className="flex justify-between items-center bg-black/30 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Vs. CroCodeat</p>
                <p className="text-sm text-gray-400">3 ngày trước</p>
              </div>
              <span className="bg-green-600 px-4 py-2 rounded font-bold">Thắng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
