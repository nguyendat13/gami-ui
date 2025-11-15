"use client";
import { useState, useEffect } from "react";
import { apiGet, apiPut, apiPost } from "@/utils/api";
import { getUserId } from "@/utils/token";
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

  // STEP 1: Cập nhật thông tin
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Người dùng chưa đăng nhập.");

      const isChangingUsername = user.username !== original.username;
      const isChangingEmail = user.email !== original.email;
      const isChangingSensitive = isChangingUsername || isChangingEmail;

      if (isChangingSensitive) {
        // Tạo payload cho OTP - chỉ gửi fields thực sự thay đổi
        const payloadOtp: any = {
          userId: user.userId,
        };
        
        if (isChangingUsername && user.username.trim()) {
          payloadOtp.newUsername = user.username;
        }
        if (isChangingEmail && user.email.trim()) {
          payloadOtp.newEmail = user.email;
        }

        console.log("Gửi payload đổi username/email với OTP:", payloadOtp);
        await apiPost("/User/request-profile-update", payloadOtp, token);
        alert("OTP đã gửi vào email cũ!");
        setStep("otp");
      } else {
        // Nếu chỉ đổi fullName/phone → update trực tiếp
        const payloadUpdate = {
          userId: user.userId,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          roleId: 0,
        };
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

  // STEP 2: Xác nhận OTP
  const handleConfirmOtp = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Người dùng chưa đăng nhập.");

      const isChangingUsername = user.username !== original.username;
      const isChangingEmail = user.email !== original.email;

      const payload: any = {
        userId: user.userId,
        otpCode: otp,
      };

      if (isChangingUsername && user.username.trim()) {
        payload.newUsername = user.username;
      }
      if (isChangingEmail && user.email.trim()) {
        payload.newEmail = user.email;
      }

      const data = await apiPost("/User/confirm-profile-update", payload, token);
      setUser(data); // backend trả về user đã cập nhật
      setOriginal({ username: data.username, email: data.email });
      alert("Cập nhật thành công!");
      setStep("done");
      
      // Reload trang sau 1.5 giây
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/90 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-[#333]">Hồ sơ của bạn</h1>

      {step === "form" && (
        <>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded-md mb-2 text-gray-900"
          />
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="Họ và tên"
            className="w-full p-2 border rounded-md mb-2 text-gray-900"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded-md mb-2 text-gray-900"
          />
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="w-full p-2 border rounded-md mb-4 text-gray-900"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#c19a6b] text-white py-2 rounded-md shadow-md"
          >
            {loading ? "Đang xử lý..." : "Cập nhật hồ sơ"}
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            className="w-full p-2 border rounded-md mb-4 text-gray-900"
          />

          <button
            onClick={handleConfirmOtp}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md shadow-md"
          >
            {loading ? "Đang xác nhận..." : "Xác nhận OTP"}
          </button>
        </>
      )}

      <Link
        href="/change-password"
        className="w-full block text-center bg-[#8c6746] text-white py-2 rounded-md shadow-md mt-3"
      >
        Đổi mật khẩu
      </Link>
    </div>
  );
}
