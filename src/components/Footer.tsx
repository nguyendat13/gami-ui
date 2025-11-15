export default function Footer() {
  return (
    <footer className="bg-[#5b3a29]/95 backdrop-blur-md text-white text-center py-4 text-sm border-t border-[#8c6746]/60 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4">
        <p className="font-serif">
          © 2025 <span className="font-semibold text-yellow-300">Gami</span> – Tự hào game Việt 🇻🇳
        </p>

        <div className="flex items-center gap-4 text-yellow-200 text-xs sm:text-sm">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            Facebook
          </a>
          <span className="text-[#d4a373]">|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            GitHub
          </a>
          <span className="text-[#d4a373]">|</span>
          <a
            href="/about"
            className="hover:text-yellow-400 transition"
          >
            Giới thiệu
          </a>
        </div>
      </div>
    </footer>
  );
}
