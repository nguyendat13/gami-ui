"use client";
import { useState, useEffect } from "react";
import { apiGet } from "@/utils/api";
import Link from "next/link";

interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeGames: 0,
    totalGames: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Không có token");

        const data = await apiGet("/User", token);
        setUsers(data);
        setStats({
          totalUsers: data.length,
          activeGames: Math.floor(Math.random() * 10),
          totalGames: Math.floor(Math.random() * 100),
        });
      } catch (err: any) {
        alert("Lỗi khi tải dữ liệu: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-10">
      <div className="bg-black/60 rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#c19a6b]">📊 Admin Dashboard</h1>
          <Link
            href="/profile"
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Hồ sơ cá nhân
          </Link>
        </div>

        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">👥 Tổng người dùng</h3>
            <p className="text-4xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-linear-to-br from-yellow-600 to-yellow-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">🎮 Trò chơi đang diễn ra</h3>
            <p className="text-4xl font-bold">{stats.activeGames}</p>
          </div>
          <div className="bg-linear-to-br from-green-600 to-green-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">📈 Tổng trò chơi</h3>
            <p className="text-4xl font-bold">{stats.totalGames}</p>
          </div>
        </div>

        {/* Danh sách người dùng */}
        <div>
          <h2 className="text-2xl font-bold text-[#c19a6b] mb-4">Danh sách người dùng</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#8c6746] text-white">
                    <th className="border border-gray-600 px-4 py-3 text-left">ID</th>
                    <th className="border border-gray-600 px-4 py-3 text-left">Username</th>
                    <th className="border border-gray-600 px-4 py-3 text-left">Tên đầy đủ</th>
                    <th className="border border-gray-600 px-4 py-3 text-left">Email</th>
                    <th className="border border-gray-600 px-4 py-3 text-left">Số điện thoại</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map((user, idx) => (
                    <tr key={user.userId} className={idx % 2 === 0 ? "bg-black/40" : "bg-black/20"}>
                      <td className="border border-gray-600 px-4 py-3">{user.userId}</td>
                      <td className="border border-gray-600 px-4 py-3">{user.username}</td>
                      <td className="border border-gray-600 px-4 py-3">{user.fullName}</td>
                      <td className="border border-gray-600 px-4 py-3">{user.email}</td>
                      <td className="border border-gray-600 px-4 py-3">{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length > 10 && (
                <p className="text-gray-400 mt-4 text-center">
                  Và {users.length - 10} người dùng khác...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Nút hành động */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/game/caro"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            🎮 Chơi Caro
          </Link>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            📋 Xem báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}
