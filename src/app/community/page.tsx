"use client";

import { useState } from "react";
import { Users, MessageCircle, Trophy, Zap, Heart, Share2, Crown, Medal } from "lucide-react";
import Link from "next/link";
import { getLeaderboard } from "@/lib/userService";
import LiveLeaderboardMini from "@/components/mini-page/LiveLeaderboardMini";
interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  wins: number;
}

interface Game {
  id: string;
  name: string;
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<string>("members");
  const [activeGame, setActiveGame] = useState<string>("caro");

  const members = [
    { id: 1, name: "Nguyễn Văn A", avatar: "🎯", rank: "Master", games: 1250 },
    { id: 2, name: "Trần Thị B", avatar: "♔", rank: "Expert", games: 890 },
    { id: 3, name: "Hoàng Minh C", avatar: "🎪", rank: "Advanced", games: 654 },
    { id: 4, name: "Lê Quốc D", avatar: "🎯", rank: "Intermediate", games: 432 },
    { id: 5, name: "Phạm Huy E", avatar: "♔", rank: "Beginner", games: 210 },
    { id: 6, name: "Võ Thị F", avatar: "🎪", rank: "Expert", games: 765 },
  ];

  const posts = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      avatar: "🎯",
      title: "Chia sẻ chiến lược Caro nâng cao",
      content: "Hôm nay mình muốn chia sẻ một số kỹ thuật đôi di chuyển trong Caro mà mình học được từ các master...",
      likes: 245,
      comments: 32,
      time: "2 giờ trước",
      category: "Chiến Lược",
    },
    {
      id: 2,
      author: "Trần Thị B",
      avatar: "♔",
      title: "Giải đấu Cờ Vua tháng 11 kết quả",
      content: "Rất vui được tham gia giải đấu cộng đồng. Kết quả cuối cùng là top 3. Cảm ơn các bạn...",
      likes: 189,
      comments: 45,
      time: "5 giờ trước",
      category: "Giải Đấu",
    },
    {
      id: 3,
      author: "Hoàng Minh C",
      avatar: "🎪",
      title: "Các bạn yêu thích Ô Ăn Quan không?",
      content: "Mình rất yêu thích trò chơi Ô Ăn Quan vì nó vừa đơn giản vừa phức tạp. Các bạn có những kinh nghiệm...",
      likes: 156,
      comments: 28,
      time: "8 giờ trước",
      category: "Thảo Luận",
    },
  ];

  const leaderboards: Record<string, LeaderboardEntry[]> = {
    caro: [
      { rank: 1, name: "Nguyễn Văn A", points: 5420, wins: 1250 },
      { rank: 2, name: "Trần Thị B", points: 4890, wins: 890 },
      { rank: 3, name: "Võ Thị F", points: 4650, wins: 765 },
      { rank: 4, name: "Lê Quốc D", points: 4230, wins: 432 },
      { rank: 5, name: "Phạm Huy E", points: 3920, wins: 210 },
    ],
    chess: [
      { rank: 1, name: "Trần Thị B", points: 6120, wins: 1150 },
      { rank: 2, name: "Nguyễn Văn A", points: 5680, wins: 987 },
      { rank: 3, name: "Hoàng Minh C", points: 5240, wins: 856 },
      { rank: 4, name: "Phạm Huy E", points: 4920, wins: 765 },
      { rank: 5, name: "Võ Thị F", points: 4650, wins: 654 },
    ],
    oanuquan: [
      { rank: 1, name: "Hoàng Minh C", points: 5890, wins: 1123 },
      { rank: 2, name: "Võ Thị F", points: 5420, wins: 987 },
      { rank: 3, name: "Phạm Huy E", points: 5100, wins: 876 },
      { rank: 4, name: "Nguyễn Văn A", points: 4780, wins: 754 },
      { rank: 5, name: "Lê Quốc D", points: 4520, wins: 645 },
    ],
    gomoku: [
      { rank: 1, name: "Phạm Huy E", points: 5640, wins: 1089 },
      { rank: 2, name: "Lê Quốc D", points: 5280, wins: 956 },
      { rank: 3, name: "Nguyễn Văn A", points: 4950, wins: 834 },
      { rank: 4, name: "Trần Thị B", points: 4620, wins: 723 },
      { rank: 5, name: "Hoàng Minh C", points: 4380, wins: 612 },
    ],
  };

  const games: Game[] = [
    { id: "caro", name: "🎯 Caro" },
    { id: "chess", name: "♔ Cờ Vua" },
    { id: "oanuquan", name: "🎪 Ô Ăn Quan" },
  ];

  const getRankColor = (rank: number): string => {
    if (rank === 1) return "bg-yellow-500/30 text-yellow-400";
    if (rank === 2) return "bg-gray-500/30 text-gray-300";
    if (rank === 3) return "bg-orange-500/30 text-orange-400";
    return "bg-cyan-500/20 text-cyan-400";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white pt-24">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-linear-to-r from-cyan-600/10 to-blue-600/10 border-b border-cyan-500/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-cyan-400" size={40} />
            <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Cộng Đồng
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl">
            Kết nối với hàng nghìn gamers Việt Nam. Chia sẻ chiến lược, tham gia giải đấu, và trở thành huyền thoại!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-linear-to-br from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border border-cyan-500/30 text-center">
              <Users className="text-cyan-400 mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-cyan-400">10K+</div>
              <div className="text-gray-400 mt-1">Thành Viên</div>
            </div>
            <div className="bg-linear-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-cyan-500/30 text-center">
              <MessageCircle className="text-purple-400 mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-purple-400">2.5K+</div>
              <div className="text-gray-400 mt-1">Bài Viết</div>
            </div>
            <div className="bg-linear-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-lg border border-cyan-500/30 text-center">
              <Trophy className="text-green-400 mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-green-400">156</div>
              <div className="text-gray-400 mt-1">Giải Đấu</div>
            </div>
            <div className="bg-linear-to-br from-yellow-900/30 to-orange-900/30 p-6 rounded-lg border border-cyan-500/30 text-center">
              <Zap className="text-yellow-400 mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-gray-400 mt-1">Hoạt Động</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Posts & Tabs */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-4 mb-8 border-b border-cyan-500/30 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("members")}
                  className={`pb-4 px-4 font-semibold transition whitespace-nowrap ${
                    activeTab === "members"
                      ? "border-b-2 border-cyan-400 text-cyan-400"
                      : "text-gray-400 hover:text-cyan-300"
                  }`}
                >
                  👥 Thành Viên
                </button>
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`pb-4 px-4 font-semibold transition whitespace-nowrap ${
                    activeTab === "posts"
                      ? "border-b-2 border-cyan-400 text-cyan-400"
                      : "text-gray-400 hover:text-cyan-300"
                  }`}
                >
                  💬 Bài Viết
                </button>
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className={`pb-4 px-4 font-semibold transition whitespace-nowrap ${
                    activeTab === "leaderboard"
                      ? "border-b-2 border-cyan-400 text-cyan-400"
                      : "text-gray-400 hover:text-cyan-300"
                  }`}
                >
                  🏆 Bảng Xếp Hạng
                </button>
              </div>

              {/* Members Tab */}
              {activeTab === "members" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-4xl">{member.avatar}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white group-hover:text-cyan-400 transition">
                            {member.name}
                          </h3>
                          <p className="text-sm text-cyan-400">{member.rank}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">Ván chơi: {member.games}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Posts Tab */}
              {activeTab === "posts" && (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-linear-to-br from-slate-900/50 to-blue-900/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-3xl">{post.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white">{post.author}</h3>
                            <span className="text-xs bg-cyan-500/30 text-cyan-300 px-2 py-1 rounded">
                              {post.category}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{post.time}</p>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 hover:text-cyan-400 cursor-pointer transition">
                        {post.title}
                      </h4>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.content}</p>
                      <div className="flex gap-6 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-red-400 transition">
                          <Heart size={16} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-cyan-400 transition">
                          <MessageCircle size={16} /> {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-400 transition">
                          <Share2 size={16} /> Chia sẻ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

           {/* Leaderboard Tab – GỌI API THẬT, DỮ LIỆU LIVE, SIÊU ĐẸP */}
              {activeTab === "leaderboard" && (
                <LiveLeaderboardMini activeGame={activeGame} games={games} setActiveGame={setActiveGame} />
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Create Post Box */}
              {/* <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 p-6 rounded-lg border border-cyan-500/30">
                <h3 className="font-bold text-white mb-4">📝 Tạo Bài Viết</h3>
                <textarea
                  placeholder="Chia sẻ ý kiến của bạn..."
                  className="w-full bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none mb-3"
                  rows={4}
                ></textarea>
                <button className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 rounded-lg transition transform hover:scale-105">
                  Đăng Bài
                </button>
              </div> */}

              {/* Quick Links */}
              <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 p-6 rounded-lg border border-cyan-500/30">
                <h3 className="font-bold text-white mb-4">🔗 Liên Kết Nhanh</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {}}
                    className="block text-cyan-400 hover:text-cyan-300 transition font-semibold"
                  >
                    👤 Hồ Sơ Của Tôi
                  </button>
                  <button
                    onClick={() => {}}
                    className="block text-cyan-400 hover:text-cyan-300 transition font-semibold"
                  >
                    🏆 Giải Đấu
                  </button>
                  <button
                    onClick={() => {}}
                    className="block text-cyan-400 hover:text-cyan-300 transition font-semibold"
                  >
                    🎮 Những Trò Chơi Của Tôi
                  </button>
                  <button
                    onClick={() => {}}
                    className="block text-cyan-400 hover:text-cyan-300 transition font-semibold"
                  >
                    ⚙️ Cài Đặt
                  </button>
                </div>
              </div>

              {/* Featured */}
              <div className="bg-linear-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/30">
                <h3 className="font-bold text-white mb-4">⭐ Nổi Bật</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Tham gia cộng đồng để trao đổi chiến lược, tìm đối thủ mạnh và nâng cao kỹ năng chơi game của bạn!
                </p>
              <Link
          href="/community/chat"
          className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 
                    hover:from-purple-600 hover:to-pink-600 text-white font-bold 
                    text-center py-3 rounded-lg transition transform hover:scale-105"
        >
          Tìm Hiểu Thêm
        </Link>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}