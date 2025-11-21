"use client";

import { useState } from "react";
import { MessageCircle, Send, Users, Settings, Search, Heart, Share2, MoreVertical, Megaphone } from "lucide-react";
import Link from "next/link";

export default function CommunityChat() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState([
    { id: 1, author: "Nguyễn Văn A", avatar: "🎯", content: "Ai muốn chơi Caro tối nay?", time: "10:30", channel: "general" },
    { id: 2, author: "Trần Thị B", avatar: "♔", content: "Mình sẵn sàng rồi! 🎮", time: "10:32", channel: "general" },
    { id: 3, author: "Hoàng Minh C", avatar: "🎪", content: "Các bạn dùng chiến lược nào nhất?", time: "10:35", channel: "general" },
    { id: 4, author: "Lê Quốc D", avatar: "🎯", content: "Tôi thích dùng chiến lược tấn công góc", time: "10:37", channel: "general" },
    { id: 5, author: "Phạm Huy E", avatar: "♔", content: "Giải đấu cuối tuần có ai tham gia không?", time: "10:40", channel: "tournaments" },
    { id: 6, author: "Võ Thị F", avatar: "🎪", content: "Mình sẽ tham gia! Năm nay cố gắng lên top 5", time: "10:42", channel: "tournaments" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const channels = [
    { id: "general", name: "💬 Tổng Quát", unread: 3 },
    { id: "tournaments", name: "🏆 Giải Đấu", unread: 2 },
    { id: "strategies", name: "🎯 Chiến Lược", unread: 0 },
    { id: "newbies", name: "👶 Tân Thủ", unread: 1 },
  ];

  const onlineUsers = [
    { id: 1, name: "Nguyễn Văn A", avatar: "🎯", status: "online" },
    { id: 2, name: "Trần Thị B", avatar: "♔", status: "online" },
    { id: 3, name: "Hoàng Minh C", avatar: "🎪", status: "idle" },
    { id: 4, name: "Lê Quốc D", avatar: "🎯", status: "online" },
    { id: 5, name: "Phạm Huy E", avatar: "♔", status: "playing" },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          author: "Bạn",
          avatar: "🎮",
          content: newMessage,
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          channel: activeChannel,
        },
      ]);
      setNewMessage("");
    }
  };

  const currentMessages = messages.filter((msg) => msg.channel === activeChannel);
  const filteredMessages = searchQuery
    ? currentMessages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentMessages;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-20 pb-10">
      {/* Header */}
      <section className="py-8 px-4 bg-linear-to-r from-cyan-600/10 to-blue-600/10 border-b border-cyan-500/30 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="text-cyan-400" size={40} />
            <h1 className="text-5xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Nhóm Chat Cộng Đồng
            </h1>
          </div>
          <p className="text-lg text-gray-300">Kết nối với cộng đồng gamers, chia sẻ chiến lược & trải nghiệm</p>
        </div>
      </section>

      {/* Main Chat */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Sidebar - Channels */}
            <div className="md:col-span-1">
              <div className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-500/30">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <MessageCircle size={20} /> Kênh Chat
                </h3>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex justify-between items-center ${
                        activeChannel === channel.id
                          ? "bg-cyan-600/40 border border-cyan-400/50 text-cyan-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      <span>{channel.name}</span>
                      {channel.unread > 0 && (
                        <span className="bg-cyan-500/70 text-white text-xs px-2 py-1 rounded-full">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Online Users */}
              <div className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-500/30 mt-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Users size={20} /> Đang Online ({onlineUsers.length})
                </h3>
                <div className="space-y-3">
                  {onlineUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 rounded hover:bg-cyan-500/20 cursor-pointer transition">
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className={`text-xs ${
                          user.status === "online" ? "text-green-400" :
                          user.status === "idle" ? "text-yellow-400" :
                          "text-cyan-400"
                        }`}>
                          {user.status === "online" ? "🟢 Online" :
                           user.status === "idle" ? "🟡 Idle" :
                           "🎮 Đang chơi"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center - Chat Messages */}
            <div className="md:col-span-2">
              <div className="bg-linear-to-br from-slate-900/50 to-blue-900/50 rounded-lg border border-cyan-500/30 overflow-hidden flex flex-col h-[600px]">
                {/* Chat Header */}
                <div className="bg-linear-to-r from-cyan-600/10 to-blue-600/10 p-4 border-b border-cyan-500/30 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-cyan-400">
                      {channels.find((ch) => ch.id === activeChannel)?.name}
                    </h2>
                  </div>
                  <button className="text-gray-400 hover:text-cyan-400 transition">
                    <Settings size={20} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-3 group">
                      <div className="text-3xl">{msg.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">{msg.author}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg text-gray-200 hover:bg-cyan-900/30 hover:border hover:border-cyan-500/30 transition cursor-pointer break-words border border-cyan-500/10">
                          {msg.content}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                        <button className="text-gray-400 hover:text-cyan-400 transition">
                          <Heart size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-cyan-400 transition">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="px-4 py-3 border-t border-cyan-500/30">
                  <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 border border-cyan-500/20 focus-within:border-cyan-400/50">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm tin nhắn..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent flex-1 text-white placeholder-gray-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-cyan-500/30 flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-slate-800/50 border border-cyan-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-2 rounded-lg transition transform hover:scale-110"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Info */}
            <div className="md:col-span-1">
              {/* Channel Info */}
              <div className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-500/30">
                <h3 className="font-bold text-white mb-3">ℹ️ Thông Tin Kênh</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    <span className="font-semibold text-cyan-400">Thành viên:</span> 1,234 người
                  </p>
                  <p>
                    <span className="font-semibold text-cyan-400">Tin nhắn hôm nay:</span> 456
                  </p>
                  <p>
                    <span className="font-semibold text-cyan-400">Chủ đề:</span>
                    <br />
                    Chia sẻ chiến lược, trao đổi kinh nghiệm
                  </p>
                </div>
              </div>

              {/* Pinned Messages */}
              <div className="bg-linear-to-br from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-cyan-500/30 mt-6">
                <h3 className="font-bold text-white mb-3">📌 Tin Nhắn Ghim</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-green-900/20 p-3 rounded hover:bg-green-900/40 hover:border hover:border-cyan-500/30 cursor-pointer transition border border-cyan-500/10">
                    <p className="font-semibold text-green-300">Giải đấu tháng 11</p>
                    <p className="text-gray-400 text-xs mt-1">Bắt đầu từ ngày 25/11</p>
                  </div>
                  <div className="bg-green-900/20 p-3 rounded hover:bg-green-900/40 hover:border hover:border-cyan-500/30 cursor-pointer transition border border-cyan-500/10">
                    <p className="font-semibold text-green-300">Nội quy cộng đồng</p>
                    <p className="text-gray-400 text-xs mt-1">Vui lòng đọc trước</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-linear-to-br from-yellow-900/30 to-orange-900/30 p-4 rounded-lg border border-cyan-500/30 mt-6">
                <h3 className="font-bold text-white mb-3">⚡ Hành Động Nhanh</h3>
                <button className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 rounded-lg transition mb-2 text-sm font-semibold transform hover:scale-105">
                  📞 Gọi Nhóm
                </button>
               <Link
                  href="/community/events/create"
                  className="w-full bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 
                            text-white py-4 rounded-2xl transition text-lg font-bold transform hover:scale-105 
                            flex items-center justify-center gap-4 shadow-xl shadow-purple-500/30"
                >
                  <Megaphone className="w-8 h-8" />
                  TẠO SỰ KIỆN MỚI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}