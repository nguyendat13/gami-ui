"use client";
import { useState, useEffect } from "react";
import { apiGet, apiPut, apiPost } from "@/utils/api";
import { getUserId, getRedirectPathByRole } from "@/utils/token";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState({
    userId: 0,
    username: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const [original, setOriginal] = useState({
    username: "",
    email: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form"); // form → otp → done
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = getUserId();
        if (!userId) throw new Error("Người dùng chưa đăng nhập.");

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Người dùng chưa đăng nhập.");

        const data = await apiGet(`/User/${userId}`, token);
        setUser(data);
        setOriginal({ username: data.username, email: data.email });
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Người dùng chưa đăng nhập.");

      const isChangingUsername = user.username !== original.username;
      const isChangingEmail = user.email !== original.email;
      const isChangingSensitive = isChangingUsername || isChangingEmail;

      if (isChangingSensitive) {
        const payloadOtp: any = { userId: user.userId };
        if (isChangingUsername && user.username.trim()) payloadOtp.newUsername = user.username;
        if (isChangingEmail && user.email.trim()) payloadOtp.newEmail = user.email;

        await apiPost("/User/request-profile-update", payloadOtp, token);
        alert("OTP đã gửi vào email cũ!");
        setStep("otp");
      } else {
        const payloadUpdate = { ...user, roleId: 0 };
        const data = await apiPut("/User/update-profile", payloadUpdate, token);
        setUser(data);
        setOriginal({ username: data.username, email: data.email });
        alert("Cập nhật hồ sơ thành công!");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Người dùng chưa đăng nhập.");

      const payload: any = { userId: user.userId, otpCode: otp };
      if (user.username !== original.username) payload.newUsername = user.username;
      if (user.email !== original.email) payload.newEmail = user.email;

      const data = await apiPost("/User/confirm-profile-update", payload, token);
      setUser(data);
      setOriginal({ username: data.username, email: data.email });
      alert("Cập nhật thành công!");
      setStep("done");

      setTimeout(() => window.location.reload(), 100);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4 font-sans">
      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-cyan-500/30">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            👤 Hồ sơ của bạn
          </h1>
          <Link
            href={getRedirectPathByRole()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold transition-transform hover:scale-105"
          >
            📊 Bảng điều khiển
          </Link>
        </div>

        {step === "form" && (
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white"
            />
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white"
            />
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white"
            />
            <button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "⏳ Đang xử lý..." : "Cập nhật hồ sơ"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
              className="w-full px-4 py-3 bg-slate-800 border border-cyan-500/50 rounded-lg focus:border-cyan-400 focus:outline-none text-white"
            />
            <button
              onClick={handleConfirmOtp}
              disabled={loading}
              className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "⏳ Đang xác nhận..." : "✅ Xác nhận OTP"}
            </button>
          </div>
        )}

        <Link
          href="/change-password"
          className="w-full block text-center bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition transform hover:scale-105 mt-4"
        >
          🔐 Đổi mật khẩu
        </Link>
      </div>
    </div>
  );
}
