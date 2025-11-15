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
    <div className="flex flex-col items-center justify-center min-h-screen text-[#3e2f1c] font-serif">
      <div className="bg-white/90 rounded-xl p-8 shadow-xl w-[90%] sm:w-[400px] border border-[#b08968]">
        <h1 className="text-3xl font-bold mb-6 text-center">Quên mật khẩu</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="p-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-[#c19a6b] hover:bg-[#b08968] text-white py-2 px-4 rounded-md">
            Gửi mật khẩu tạm thời
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <a href="/login" className="text-[#a0522d] underline">
            Quay lại đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
