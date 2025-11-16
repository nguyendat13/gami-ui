"use client";

import { useState } from "react";
import GameNavbar from "@/components/GameNavbar";

export default function ChineseChessPage() {
  const [gameStatus, setGameStatus] = useState("Chuẩn bị");

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <GameNavbar gameName="Cờ Vua" gameIcon="♔" />

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6 pt-24">
        <div className="mb-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 bg-linear-to-r from-amber-400 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
            ♔ Cờ Vua
          </h2>
          <p className="text-gray-300 text-lg">Trò chơi chiến thuật quốc tế được biết đến rộng rãi</p>
        </div>

        {/* Game board placeholder */}
        <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-cyan-500/30 w-full max-w-2xl">
          <div className="p-8 rounded-lg shadow-inner">
            <div className="grid grid-cols-8 gap-0 aspect-square bg-linear-to-b from-amber-700 to-amber-900 p-2 rounded-lg">
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isLight = (row + col) % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`border border-amber-900 hover:opacity-75 transition cursor-pointer flex items-center justify-center ${
                      isLight ? "bg-amber-100" : "bg-amber-700"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Game info */}
          <div className="mt-6 flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
            <div className="text-gray-300">
              <p className="font-semibold">Trạng thái: <span className="text-amber-400">{gameStatus}</span></p>
            </div>
            <button
              onClick={() => setGameStatus("Đang chơi")}
              className="bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-6 py-2 rounded-lg transition transform hover:scale-105"
            >
              🎮 Bắt đầu
            </button>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-12 max-w-2xl bg-linear-to-r from-slate-900/50 to-blue-900/50 p-6 rounded-lg border border-cyan-500/20">
          <h3 className="text-xl font-bold text-cyan-400 mb-3">ℹ️ Luật chơi</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Mỗi bên điều khiển 16 quân cờ gồm: 1 vua, 1 hậu, 2 xe, 2 mã, 2 tượng, 8 tốt</li>
            <li>• Mục tiêu: Chiếu vua đối phương (Checkmate)</li>
            <li>• Mỗi loại quân có cách di chuyển riêng biệt theo luật cờ vua quốc tế</li>
            <li>• Trò chơi này yêu cầu chiến lược sâu sắc và tư duy dự báo nhiều nước</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
