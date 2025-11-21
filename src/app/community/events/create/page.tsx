"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, MessageCircle, Calendar, Users, Megaphone, Plus, ChevronRight, TimerResetIcon, FileText } from "lucide-react";

export default function CreateEventHubPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const eventTypes = [
    {
      id: "tournament",
      name: "Giải Đấu",
      icon: Trophy,
      color: "from-yellow-600 to-orange-700",
      desc: "Tổ chức giải đấu chuyên nghiệp với bảng xếp hạng tự động",
      features: ["Bracket tự động", "Phần thưởng", "Live stream", "Top 100 tự động"],
    },
    {
      id: "chat-channel",
      name: "Kênh Chat Mới",
      icon: MessageCircle,
      color: "from-cyan-600 to-blue-700",
      desc: "Tạo phòng chat riêng cho nhóm, clan hoặc sự kiện",
      features: ["Quyền riêng tư", "Ghim tin nhắn", "Role moderator", "Voice chat (sắp có)"],
    },
    {
      id: "community-event",
      name: "Sự Kiện Cộng Đồng",
      icon: Calendar,
      color: "from-purple-600 to-pink-700",
      desc: "Tổ chức buổi livestream, workshop, AMA...",
      features: ["Lịch trình", "Đếm ngược", "Thông báo push", "RSVP"],
    },
    {
      id: "clan-recruit",
      name: "Tuyển Thành Viên Clan",
      icon: Users,
      color: "from-green-600 to-emerald-700",
      desc: "Tìm đồng đội, thành lập team thi đấu",
      features: ["Yêu cầu rank", "Mô tả clan", "Apply form", "Tag kỹ năng"],
    },
    {
      id: "announcement",
      name: "Thông Báo Lớn",
      icon: Megaphone,
      color: "from-red-600 to-rose-700",
      desc: "Gửi thông báo quan trọng đến toàn server",
      features: ["Highlight 24h", "Pin top", "Push notification", "Banner trang chủ"],
    },
    {
  id: "article",
  name: "Đăng Bài Viết",
  icon: FileText,
  color: "from-purple-600 to-pink-700",
  desc: "Viết bài hướng dẫn, chia sẻ chiến lược, câu chuyện cá nhân",
  features: ["Markdown editor", "Embed YouTube", "Thumbnail đẹp", "Tag hệ thống"],
},
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/community/chat" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 text-lg font-semibold">
            <ArrowLeft className="w-6 h-6" /> Quay lại Chat
          </Link>

          <div className="flex items-center justify-center gap-8 mb-8">
            <Megaphone className="w-20 h-20 text-cyan-400 drop-shadow-2xl animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              TẠO SỰ KIỆN
            </h1>
            <Megaphone className="w-20 h-20 text-cyan-400 drop-shadow-2xl animate-pulse" />
          </div>
          <p className="text-2xl text-cyan-300 max-w-3xl mx-auto">
            Tạo giải đấu, kênh chat, tuyển clan, thông báo lớn – tất cả trong một nơi!
          </p>
        </div>

        {/* Nếu chưa chọn loại sự kiện */}
        {!selectedType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className="group relative bg-linear-to-br from-slate-900/70 to-blue-900/70 rounded-3xl p-10 border-4 border-cyan-500/30 
                             hover:border-cyan-400 hover:shadow-3xl hover:shadow-cyan-500/50 
                             transition-all transform hover:scale-105 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${type.color} opacity-0 group-hover:opacity-20 transition`}></div>

                  <div className="relative z-10 text-center">
                    <div className={`w-28 h-28 mx-auto bg-linear-to-br ${type.color} rounded-full flex items-center justify-center mb-6 shadow-2xl ring-8 ring-white/20`}>
                      <Icon className="w-16 h-16 text-white drop-shadow-2xl" />
                    </div>

                    <h3 className="text-4xl font-bold text-white mb-4">{type.name}</h3>
                    <p className="text-cyan-300 text-lg mb-6 leading-relaxed">{type.desc}</p>

                    <div className="space-y-3 text-left">
                      {type.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-300">
                          <ChevronRight className="w-5 h-5 text-cyan-400" />
                          <span className="text-sm">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <span className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-xl group-hover:scale-110 transition">
                        <Plus className="w-8 h-8" />
                        TẠO NGAY
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Khi đã chọn loại → Chuyển hướng tự động */
          <div className="text-center py-20">
            <div className="inline-block bg-linear-to-br from-cyan-900/70 to-blue-900/70 rounded-3xl p-16 border-4 border-cyan-400 shadow-3xl">
              <Trophy className="w-32 h-32 text-cyan-400 mx-auto mb-8 animate-bounce" />
              <h2 className="text-5xl font-bold text-cyan-300 mb-6">
    
              </h2>
              <div className="flex justify-center gap-6 mt-10">
                {selectedType === "tournament" && (
                  <Link href="/community/tournament/create" className="px-12 py-6 bg-linear-to-r from-yellow-500 to-orange-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition">
                    TẠO GIẢI ĐẤU NGAY
                  </Link>
                )}
                {selectedType === "chat-channel" && (
                  <Link href="/community/chat/create-channel" className="px-12 py-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition">
                    TẠO KÊNH CHAT NGAY
                  </Link>
                )}
                {selectedType === "community-event" && (
                  <Link href="/community/community-event/create" className="px-12 py-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition">
                    TẠO SỰ KIỆN CỘNG ĐỒNG NGAY
                  </Link>
                )}
                  {selectedType === "clan-recruit" && (
                  <Link href="/community/clan-recruit/create" className="px-12 py-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition">
                    TUYỂN THÀNH VIÊN CLAN NGAY
                  </Link>
                )}
                  {selectedType === "announcement" && (
                  <Link href="/community/announcement/create" className="px-12 py-6 bg-linear-to-r from-cyan-500 to-blue-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition">
                    TẠO THÔNG BÁO LỚN NGAY
                  </Link>
                )}
                {selectedType === "article" && (
                    <Link href="/community/article/create" className="px-12 py-6 bg-linear-to-r from-purple-500 to-pink-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:scale-110 transition">
                      ĐĂNG BÀI VIẾT NGAY
                    </Link>
                  )}
                {/* Thêm các loại khác sau */}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-20 text-cyan-400/70 text-lg">
          <p>Quyền tạo sự kiện: Thành viên từ rank Expert trở lên • Được duyệt trong 5 phút</p>
        </div>
      </div>
    </div>
  );
}