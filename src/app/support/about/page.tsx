"use client";

import { Gamepad2, Heart, Users, Zap, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-linear-to-r from-cyan-600/10 to-blue-600/10 border-b border-cyan-500/30 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="text-cyan-400" size={40} />
            <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Về Gami
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Nền tảng game truyền thống Việt Nam hiện đại, kết nối cộng đồng gamers và tôn vinh các trò chơi dân tộc.
          </p>
        </div>
      </section>

      <section className="px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="text-cyan-400" size={24} />
                <h2 className="text-2xl font-bold text-cyan-400">Sứ Mệnh</h2>
              </div>
              <p className="text-gray-300">
                Bảo vệ và phát triển các trò chơi dân tộc Việt Nam, giúp các thế hệ trẻ kết nối với văn hóa truyền thống qua hình thức digital hiện đại.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-purple-400">Tầm Nhìn</h2>
              </div>
              <p className="text-gray-300">
                Trở thành nền tảng game truyền thống số 1 tại Việt Nam, nơi mọi người có thể yêu thích, cạnh tranh và chia sẻ đam mê chơi game.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-8 rounded-lg border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Tại Sao Chọn Gami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Users, title: "Cộng Đồng Sôi Động", desc: "10K+ gamers hoạt động hàng ngày" },
                { icon: Gamepad2, title: "Trò Chơi Đa Dạng", desc: "Caro, Cờ Vua, Ô Ăn Quan & hơn thế nữa" },
                { icon: Shield, title: "An Toàn & Tin Cậy", desc: "Bảo vệ dữ liệu người dùng 100%" },
                { icon: Zap, title: "Trải Nghiệm Mượt", desc: "Giao diện hiện đại, tốc độ nhanh" },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <feature.icon className="text-cyan-400 shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-8 rounded-lg border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Đội Ngũ Phát Triển</h2>
            <p className="text-gray-300 mb-6">
              Gami được phát triển bởi một nhóm các nhà phát triển game và designer tìm hiểu sâu về các trò chơi truyền thống Việt Nam.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Nguyễn Văn A", role: "Founder & CEO" },
                { name: "Trần Thị B", role: "Lead Developer" },
                { name: "Hoàng Minh C", role: "Game Designer" },
              ].map((member, idx) => (
                <div key={idx} className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/20 text-center">
                  <p className="font-bold text-white">{member.name}</p>
                  <p className="text-sm text-cyan-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-8 rounded-lg border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Lịch Sử Phát Triển</h2>
            <div className="space-y-4">
              {[
                { year: "2023", event: "Gami được thành lập với mục tiêu số hóa các trò chơi truyền thống" },
                { year: "2024", event: "Ra mắt Caro Online, đạt 5K người chơi trong 3 tháng" },
                { year: "2024", event: "Thêm Cờ Vua và Ô Ăn Quan vào nền tảng" },
                { year: "2025", event: "Vượt mốc 10K người chơi hoạt động, kỷ lục 50K trận/ngày" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b border-cyan-500/20 last:border-0">
                  <div className="text-cyan-400 font-bold text-lg w-16">{item.year}</div>
                  <p className="text-gray-300">{item.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-linear-to-r from-cyan-600/10 to-blue-600/10 p-8 rounded-lg border border-cyan-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Muốn Tìm Hiểu Thêm?</h2>
            <p className="text-gray-300 mb-6">
              Liên hệ với chúng tôi tại{" "}
              <a href="mailto:support@gami.vn" className="text-cyan-400 hover:text-cyan-300">
                support@gami.vn
              </a>
            </p>
            <button className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
              📧 Liên Hệ Ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}