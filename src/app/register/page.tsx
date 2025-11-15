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
    <div className="flex flex-col items-center justify-center min-h-screen text-[#3e2f1c] font-serif">
      <div className="bg-white/90 rounded-xl p-8 shadow-xl w-[90%] sm:w-[400px] border border-[#b08968]">
        <h1 className="text-3xl font-bold mb-6 text-center">Đăng ký</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 border rounded-md"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Họ và tên"
            className="p-2 border rounded-md"
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-md"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="p-2 border rounded-md"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-[#a0522d] underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
