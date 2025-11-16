"use client";
import { useState, useEffect } from "react";
import { apiPut } from "@/utils/api";
import { getUserId } from "@/utils/token";
import { useRouter } from "next/navigation"; // dùng router để chuyển trang

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", userId: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Lấy userId từ token khi component mount
  useEffect(() => {
    const userId = getUserId();
    if (userId) setForm(prev => ({ ...prev, userId }));
    else alert("Người dùng chưa đăng nhập!");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập!");
        return;
      }

      await apiPut("/User/change-password", form, token);

      alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");

      // ✅ Xóa token và userId
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Chuyển về trang login
      router.push("/login");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-serif py-10">
      <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[90%] sm:w-[420px] border border-cyan-500/30">
        <h1 className="text-4xl font-bold mb-2 text-center bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          🔐 Đổi mật khẩu
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Cập nhật mật khẩu của bạn</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Mật khẩu hiện tại</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
            />
          </div>

          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Đang xử lý..." : " Đổi mật khẩu"}
          </button>
        </form>

        <div className="mt-6 border-t border-cyan-500/20 pt-4">
          <p className="text-center text-gray-400">
            <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold underline transition">
              Quay lại đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
