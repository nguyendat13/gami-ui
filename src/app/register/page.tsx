"use client";
import { useState } from "react";
import Link from "next/link";
import { apiPost } from "@/utils/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", fullname: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Tạo payload đúng với DTO backend
      const payload = {
        username: form.username,
        fullName: form.fullname,
        email: form.email,
        phone: form.phone,
        password: form.password
      };

      await apiPost("/Auth/register", payload);
      alert("Đăng ký thành công!");
      window.location.href = "/login";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-serif py-10 px-4">
      <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[90%] sm:w-[420px] border border-cyan-500/30">
        <h1 className="text-4xl font-bold mb-2 text-center bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          📝 Đăng ký
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Tạo tài khoản mới và bắt đầu chơi</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Username</label>
            <input
              type="text"
              placeholder="Chọn username"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập tên đầy đủ"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Số điện thoại</label>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Mật khẩu</label>
            <input
              type="password"
              placeholder="Tạo mật khẩu mạnh"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Đang đăng ký..." : " Tạo tài khoản"}
          </button>
        </form>

        <div className="mt-6 border-t border-cyan-500/20 pt-4">
          <p className="text-center text-gray-400">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold underline transition">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
