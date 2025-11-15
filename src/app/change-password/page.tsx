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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/90 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Đổi mật khẩu</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Mật khẩu hiện tại"
          className="p-2 border rounded-md text-gray-900"
        />
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          placeholder="Mật khẩu mới"
          className="p-2 border rounded-md text-gray-900"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#c19a6b] text-white py-2 rounded-md hover:bg-[#b08968] transition"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
