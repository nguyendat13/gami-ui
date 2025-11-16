"use client";
import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "@/utils/api";
import Link from "next/link";

interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: number;
}

const roleNames: { [key: number]: string } = {
  1: "Superadmin",
  2: "Admin",
  3: "Người dùng",
};

export default function SuperadminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Không có token");

        const data = await apiGet("/User", token);
        setUsers(data);
      } catch (err: any) {
        alert("Lỗi khi tải danh sách người dùng: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    if (!confirm("Bạn chắc chắn muốn xóa người dùng này?")) return;

    try {
      setDeletingId(userId);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token");

      await apiDelete(`/User/${userId}`, token);
      setUsers(users.filter((u) => u.userId !== userId));
      alert("Xóa người dùng thành công!");
    } catch (err: any) {
      alert("Lỗi khi xóa: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-10">
      <div className="bg-black/60 rounded-xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#c19a6b]">🔐 Superadmin Dashboard</h1>
          <Link
            href="/profile"
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Hồ sơ cá nhân
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Tổng người dùng</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <div className="bg-linear-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Admins</h3>
            <p className="text-3xl font-bold">{users.filter((u) => u.roleId === 2).length}</p>
          </div>
          <div className="bg-linear-to-br from-green-600 to-green-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Người dùng thường</h3>
            <p className="text-3xl font-bold">{users.filter((u) => u.roleId === 3).length}</p>
          </div>
        </div>

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
                  <th className="border border-gray-600 px-4 py-3 text-left">Vai trò</th>
                  <th className="border border-gray-600 px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.userId} className={idx % 2 === 0 ? "bg-black/40" : "bg-black/20"}>
                    <td className="border border-gray-600 px-4 py-3">{user.userId}</td>
                    <td className="border border-gray-600 px-4 py-3">{user.username}</td>
                    <td className="border border-gray-600 px-4 py-3">{user.fullName}</td>
                    <td className="border border-gray-600 px-4 py-3">{user.email}</td>
                    <td className="border border-gray-600 px-4 py-3">{user.phone}</td>
                    <td className="border border-gray-600 px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.roleId === 1
                            ? "bg-red-600"
                            : user.roleId === 2
                              ? "bg-purple-600"
                              : "bg-green-600"
                        }`}
                      >
                        {roleNames[user.roleId]}
                      </span>
                    </td>
                    <td className="border border-gray-600 px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(user.userId)}
                        disabled={deletingId === user.userId}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition"
                      >
                        {deletingId === user.userId ? "Đang xóa..." : "Xóa"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
