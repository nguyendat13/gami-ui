"use client";
import { useState } from "react";
import Link from "next/link";
import { apiPost } from "@/utils/api";
import { getRedirectPathByRole } from "@/utils/token";

export default function LoginPage() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        usernameOrEmail: form.usernameOrEmail,
        password: form.password,
      };

      const result = await apiPost("/Auth/login", payload);

      alert("Đăng nhập thành công!");

      localStorage.setItem("token", result.token);
      
      // Redirect dựa vào role
      const redirectPath = getRedirectPathByRole();
      window.location.href = redirectPath;
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-serif">
      <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[90%] sm:w-[420px] border border-cyan-500/30">
        <h1 className="text-4xl font-bold mb-2 text-center bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          🔑 Đăng nhập
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Chào mừng bạn quay lại</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Email hoặc Username</label>
            <input
              type="text"
              placeholder="Nhập email hoặc username"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Đang đăng nhập..." : " Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 border-t border-cyan-500/20 pt-4">
          <div className="text-center mb-4">
            <Link href="/forgot-password" className="text-cyan-400 hover:text-cyan-300 underline text-sm transition">
              Quên mật khẩu?
            </Link>
          </div>

          <p className="text-center text-gray-400">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold underline transition">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
