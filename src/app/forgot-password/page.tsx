"use client";
import { useState } from "react";
import { apiPost } from "@/utils/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await apiPost("/Auth/forgot-password", { email });
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-serif py-10">
      <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl w-[90%] sm:w-[420px] border border-cyan-500/30">
        <h1 className="text-4xl font-bold mb-2 text-center bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          🔑 Quên mật khẩu
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Nhập email để lấy lại mật khẩu</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-105">
            📧 Gửi mật khẩu tạm thời
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
