"use client";
import { useState } from "react";
import Link from "next/link";
import { apiPost } from "@/utils/api";

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
      window.location.href = "/";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-[#3e2f1c] font-serif">
      <div className="bg-white/90 rounded-xl p-8 shadow-xl w-[90%] sm:w-[400px] border border-[#b08968]">
        <h1 className="text-3xl font-bold mb-6 text-center">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email hoặc username"
            className="p-2 border rounded-md"
            onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="p-2 border rounded-md"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="bg-[#c19a6b] hover:bg-[#b08968] text-white py-2 px-4 rounded-md shadow-md transition"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-[#a0522d] underline text-sm">
            Quên mật khẩu?
          </Link>
        </div>

        <p className="mt-4 text-center text-[20px]">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-[#a0522d] underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
