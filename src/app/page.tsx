"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const games = [
    {
      name: "Cờ Caro",
      description: "Trò chơi chiến thuật cổ điển",
      img: "/images/caro-bg.jpg",
      link: "/game/caro",
      icon: "🎯",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Cờ Vua",
      description: "Trí tuệ và chiến lược",
      img: "/images/chess-bg.jpg",
      link: "/game/coro-vua",
      icon: "♔",
      color: "from-amber-600 to-amber-800",
    },
    {
      name: "Ô Ăn Quan",
      description: "Trò chơi truyền thống Việt",
      img: "/images/capture-the-flag-bg.jpg",
      link: "/game/capture-the-flag",
      icon: "🎪",
      color: "from-purple-600 to-purple-800",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-pulse">
            🎮 GAMI
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-300 mb-3 font-light">
            Nơi hội tụ các trò chơi Việt Nam cổ điển
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Thử thách bản thân, chinh phục những người chơi khác
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
                >
                  🔑 Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
                >
                  📝 Đăng ký
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
                >
                  👤 Hồ sơ
                </Link>
                <Link
                  href="/game/caro"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
                >
                  🎮 Chơi ngay
                </Link>
              </>
            )}
            <Link
              href="/community"
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              🌍 Cộng Đồng
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div className="text-center p-6 bg-blue-900/40 rounded-lg border border-cyan-500/30">
              <div className="text-4xl font-bold text-cyan-400">10K+</div>
              <div className="text-gray-400 mt-2">Người chơi</div>
            </div>
            <div className="text-center p-6 bg-blue-900/40 rounded-lg border border-cyan-500/30">
              <div className="text-4xl font-bold text-blue-400">500K+</div>
              <div className="text-gray-400 mt-2">Ván chơi</div>
            </div>
            <div className="text-center p-6 bg-blue-900/40 rounded-lg border border-cyan-500/30">
              <div className="text-4xl font-bold text-purple-400">3</div>
              <div className="text-gray-400 mt-2">Trò chơi</div>
            </div>
            <div className="text-center p-6 bg-blue-900/40 rounded-lg border border-cyan-500/30">
              <div className="text-4xl font-bold text-pink-400">24/7</div>
              <div className="text-gray-400 mt-2">Hoạt động</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            🏆 Các Trò Chơi Nổi Bật
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Chọn trò chơi yêu thích và bắt đầu cuộc phiêu lưu của bạn
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {games.map((game) => (
              <div
                key={game.name}
                className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-400/50"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={game.img}
                    alt={game.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-300"></div>
                </div>

                {/* Content */}
                <div className={`bg-linear-to-br ${game.color} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{game.icon}</span>
                    <h3 className="text-2xl font-bold">{game.name}</h3>
                  </div>
                  <p className="text-sm text-gray-200 mb-4 h-10">{game.description}</p>

                  <Link
                    href={isLoggedIn ? game.link : "/login"}
                    className="inline-block w-full text-center bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
                  >
                    {isLoggedIn ? "🎮 Chơi ngay" : "🔑 Đăng nhập để chơi"}
                  </Link>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-cyan-500 text-slate-950 px-3 py-1 rounded-full font-bold text-sm">
                  ⭐ Hot
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-linear-to-r from-cyan-600/20 to-blue-600/20 border-t border-cyan-500/30">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Sẵn sàng thử thách?
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Tham gia cộng đồng gamers Việt Nam và chứng minh kỹ năng của bạn
          </p>
          <Link
            href={isLoggedIn ? "/game/caro" : "/login"}
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-10 py-4 rounded-lg shadow-xl transition transform hover:scale-105 text-lg border border-cyan-400"
          >
            ⚡ Bắt đầu ngay
          </Link>
        </div>
      </section>

      {/* Blog/Articles Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            📰 Bài Viết Nổi Bật
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Cập nhật tin tức, mẹo chơi và chiến lược từ cộng đồng
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="group bg-linear-to-br from-slate-900/80 to-blue-900/80 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-400/50">
              <div className="h-48 bg-linear-to-r from-cyan-600/30 to-blue-600/30 flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🎯</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-cyan-500/30 text-cyan-300 px-2 py-1 rounded">Chiến Lược</span>
                  <span className="text-xs text-gray-500">2 ngày trước</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  Bí Quyết Chinh Phục Cờ Caro
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  Học các chiến lược cao cấp để trở thành người chơi Caro hàng đầu. Từ những bước đầu tiên đến các kỹ thuật nâng cao.
                </p>
                <Link href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition">
                  Đọc thêm →
                </Link>
              </div>
            </article>

            {/* Article 2 */}
            <article className="group bg-linear-to-br from-slate-900/80 to-blue-900/80 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-400/50">
              <div className="h-48 bg-linear-to-r from-amber-600/30 to-yellow-600/30 flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">♔</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-amber-500/30 text-amber-300 px-2 py-1 rounded">Hướng Dẫn</span>
                  <span className="text-xs text-gray-500">5 ngày trước</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  Hướng Dẫn Cơ Bản Cờ Vua
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  Khám phá cách chơi cờ vua từ những kiến thức cơ bản nhất. Phù hợp cho những người chơi mới bắt đầu.
                </p>
                <Link href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition">
                  Đọc thêm →
                </Link>
              </div>
            </article>

            {/* Article 3 */}
            <article className="group bg-linear-to-br from-slate-900/80 to-blue-900/80 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-400/50">
              <div className="h-48 bg-linear-to-r from-purple-600/30 to-pink-600/30 flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">🎪</div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded">Văn Hóa</span>
                  <span className="text-xs text-gray-500">1 tuần trước</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  Ô Ăn Quan - Trò Chơi Văn Hóa Việt
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  Khám phá lịch sử và ý nghĩa của trò chơi Ô Ăn Quan truyền thống Việt Nam. Một phần của di sản văn hóa.
                </p>
                <Link href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition">
                  Đọc thêm →
                </Link>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link
              href="#"
              className="inline-block bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              📚 Xem Tất Cả Bài Viết
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
