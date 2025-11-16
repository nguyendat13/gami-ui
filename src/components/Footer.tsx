import Link from "next/link";
import { Gamepad2, Facebook, Github, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-t border-cyan-500/20 mt-16">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="text-cyan-400" size={32} />
              <h3 className="text-2xl font-serif font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Gami
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Nền tảng trò chơi Việt Nam cổ điển. Kết nối, chinh phục, trở thành huyền thoại.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 p-2 rounded-lg transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 p-2 rounded-lg transition"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:support@gami.vn"
                className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 p-2 rounded-lg transition"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Trò Chơi */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">🎮 Trò Chơi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/game/caro" className="text-gray-400 hover:text-cyan-400 transition">
                  Cờ Caro
                </Link>
              </li>
              <li>
                <Link href="/game/coro-vua" className="text-gray-400 hover:text-cyan-400 transition">
                  Cờ Vua
                </Link>
              </li>
              <li>
                <Link href="/game/capture-the-flag" className="text-gray-400 hover:text-cyan-400 transition">
                  Ô Ăn Quan
                </Link>
              </li>
            </ul>
          </div>

          {/* Cộng Đồng */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">👥 Cộng Đồng</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/community" className="text-gray-400 hover:text-cyan-400 transition">
                  Diễn Đàn
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  Giải Đấu
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  Bảng Xếp Hạng
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ Trợ */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">💬 Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition">
                  Chính Sách Bảo Mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên Hệ */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">📞 Liên Hệ</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <a href="mailto:support@gami.vn" className="text-gray-400 hover:text-cyan-400 transition">
                    support@gami.vn
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Hotline</p>
                  <a href="tel:+84123456789" className="text-gray-400 hover:text-cyan-400 transition">
                    +84 (123) 456-789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-gray-500 text-xs">Địa Chỉ</p>
                  <p className="text-gray-400">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-500/20 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 <span className="text-cyan-400 font-semibold">Gami</span> – Tự hào game Việt 🇻🇳
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="hover:text-cyan-400 cursor-pointer transition">Tiếng Việt</span>
            <span>|</span>
            <span className="hover:text-cyan-400 cursor-pointer transition">English</span>
            <span>|</span>
            <span className="hover:text-cyan-400 cursor-pointer transition">繁體中文</span>
          </div>
        </div>
      </div>

      {/* Gradient Border Top */}
      <div className="h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50"></div>
    </footer>
  );
}
