"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Tag, Image, Youtube, Code, Save, Eye, Send } from "lucide-react";

export default function CreateArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "strategy",
    thumbnail: "",
    content: "",
    tags: "",
    youtubeLink: "",
    isGuide: false,
  });

  const categories = [
    { id: "strategy", name: "Chiến Lược", color: "cyan" },
    { id: "guide", name: "Hướng Dẫn", color: "green" },
    { id: "news", name: "Tin Tức", color: "purple" },
    { id: "review", name: "Đánh Giá", color: "orange" },
    { id: "story", name: "Câu Chuyện", color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/community/events/create" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 text-lg font-semibold">
            <ArrowLeft className="w-6 h-6" /> Quay lại Hub Sự Kiện
          </Link>

          <div className="flex items-center justify-center gap-8 mb-8">
            <FileText className="w-24 h-24 text-purple-400 drop-shadow-2xl animate-pulse" />
            <h1 className="text-7xl md:text-8xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              ĐĂNG BÀI VIẾT
            </h1>
            <FileText className="w-24 h-24 text-purple-400 drop-shadow-2xl animate-pulse" />
          </div>
          <p className="text-3xl text-purple-300 max-w-4xl mx-auto font-light">
            Chia sẻ kiến thức, hướng dẫn, câu chuyện – trở thành cây bút nổi bật của cộng đồng!
          </p>
        </div>

        <form className="space-y-12">

          {/* Tiêu đề */}
          <div className="bg-linear-to-br from-slate-900/80 to-purple-900/50 p-12 rounded-3xl border-4 border-purple-500/50 shadow-3xl">
            <label className="text-3xl font-bold text-purple-300 mb-8 block flex items-center gap-4">
              <FileText className="w-12 h-12" /> Tiêu Đề Bài Viết
            </label>
            <input
              type="text"
              required
              placeholder="VD: 10 Chiến Lược Caro Không Thể Bại, Hướng Dẫn Gomoku Từ A-Z..."
              className="w-full bg-slate-800/80 border-4 border-purple-500/60 rounded-3xl px-10 py-10 text-4xl text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none transition shadow-2xl"
            />
          </div>

          {/* Danh mục + Thumbnail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Danh mục */}
            <div className="bg-linear-to-br from-slate-900/80 to-purple-900/50 p-12 rounded-3xl border-4 border-purple-500/50 shadow-3xl">
              <label className="text-3xl font-bold text-purple-300 mb-10 block flex items-center gap-4">
                <Tag className="w-12 h-12" /> Danh Mục
              </label>
              <div className="grid grid-cols-2 gap-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={`relative p-10 rounded-3xl font-bold text-3xl transition-all transform hover:scale-110 shadow-2xl overflow-hidden ${
                      formData.category === cat.id
                        ? `bg-linear-to-r from-${cat.color}-500 to-${cat.color}-600 text-white ring-8 ring-${cat.color}-300 shadow-${cat.color}-500/70`
                        : "bg-slate-800/80 border-4 border-purple-500/40 text-purple-300 hover:border-purple-400"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="bg-linear-to-br from-slate-900/80 to-purple-900/50 p-12 rounded-3xl border-4 border-purple-500/50 shadow-3xl">
              <label className="text-3xl font-bold text-purple-300 mb-10 block flex items-center gap-4">
                <Image className="w-12 h-12" /> Ảnh Bìa (Thumbnail)
              </label>
              <div className="border-4 border-dashed border-purple-500/50 rounded-3xl h-96 bg-slate-800/50 flex items-center justify-center cursor-pointer hover:border-purple-400 transition">
                <div className="text-center">
                  <Image className="w-24 h-24 text-purple-400 mx-auto mb-6" />
                  <p className="text-2xl text-purple-300 font-bold">Click để tải ảnh lên</p>
                  <p className="text-gray-400 mt-4">Kích thước khuyến nghị: 1200x630</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nội dung bài viết */}
          <div className="bg-linear-to-br from-slate-900/80 to-purple-900/50 p-12 rounded-3xl border-4 border-purple-500/50 shadow-3xl">
            <label className="text-3xl font-bold text-purple-300 mb-10 block flex items-center gap-4">
              <FileText className="w-12 h-12" /> Nội Dung Bài Viết
            </label>
            <textarea
              required
              placeholder="Viết bài tại đây... Hỗ trợ Markdown, code block, embed YouTube..."
              rows={20}
              className="w-full bg-slate-800/80 border-4 border-purple-500/60 rounded-3xl px-10 py-10 text-xl text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none font-mono leading-relaxed"
            />
          </div>

          {/* YouTube + Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-linear-to-br from-red-900/50 to-pink-900/50 p-12 rounded-3xl border-4 border-red-500/50 shadow-3xl">
              <label className="text-3xl font-bold text-red-300 mb-10 block flex items-center gap-4">
                <Youtube className="w-12 h-12" /> Video YouTube (Tùy chọn)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-slate-800/80 border-4 border-red-500/60 rounded-3xl px-10 py-10 text-xl text-white placeholder-gray-500 focus:border-red-400 focus:outline-none"
              />
            </div>

            <div className="bg-linear-to-br from-indigo-900/50 to-purple-900/50 p-12 rounded-3xl border-4 border-indigo-500/50 shadow-3xl">
              <label className="text-3xl font-bold text-indigo-300 mb-10 block flex items-center gap-4">
                <Tag className="w-12 h-12" /> Tags (phẩy cách nhau)
              </label>
              <input
                type="text"
                placeholder="caro, gomoku, hướng dẫn, pro tip, beginner..."
                className="w-full bg-slate-800/80 border-4 border-indigo-500/60 rounded-3xl px-10 py-10 text-xl text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none"
              />
            </div>
          </div>
<div className="text-center pt-12">
  <div className="flex justify-center gap-8">

    {/* LƯU NHÁP */}
    <button
      type="button"
      className="group inline-flex items-center gap-3 px-10 py-5
                 bg-gradient-to-r from-gray-600 to-slate-700
                 hover:from-gray-700 hover:to-slate-800
                 text-white text-xl font-bold
                 rounded-2xl shadow-lg shadow-gray-700/30
                 transition-all transform hover:scale-105"
    >
      <Save className="w-6 h-6" />
      LƯU NHÁP
    </button>

    {/* XEM TRƯỚC */}
    <button
      type="button"
      className="group inline-flex items-center gap-3 px-10 py-5
                 bg-gradient-to-r from-purple-600 to-pink-600
                 hover:from-purple-700 hover:to-pink-700
                 text-white text-xl font-bold
                 rounded-2xl shadow-lg shadow-purple-600/30
                 transition-all transform hover:scale-105"
    >
      <Eye className="w-6 h-6" />
      XEM TRƯỚC
    </button>

    {/* ĐĂNG BÀI VIẾT */}
    <button
      type="submit"
      className="group inline-flex items-center gap-4 px-14 py-6
                 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600
                 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700
                 text-white text-3xl font-bold
                 rounded-full shadow-xl shadow-purple-600/60
                 transition-all transform hover:scale-110"
    >
      <Send className="w-8 h-8 group-hover:translate-x-2 transition" />
      ĐĂNG
    </button>

  </div>
</div>

        </form>
      </div>
    </div>
  );
}