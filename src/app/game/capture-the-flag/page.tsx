"use client";

import { useState } from "react";
import GameNavbar from "@/components/GameNavbar";

export default function CaptureTheFlagPage() {
  const [gameStatus, setGameStatus] = useState("Chuẩn bị");
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <GameNavbar gameName="Ô Ăn Quan" gameIcon="🎲" />

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 sm:p-6 pt-24">
        <div className="mb-8 text-center p-6">
         <h2 className="text-4xl sm:text-5xl font-bold mb-2 bg-linear-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent leading-normal">
  🎲 Ô Ăn Quan
</h2>

          <p className="text-gray-300 text-lg">Trò chơi dân gian Việt Nam truyền thống</p>
        </div>

        {/* Game board */}
        <div className="bg-linear-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md p-8  rounded-2xl shadow-2xl border border-cyan-500/30 w-full max-w-4xl">
          {/* Board */}
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 rounded-lg shadow-inner">
            <div className="grid grid-cols-7 gap-4 mb-8">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-b from-purple-800 to-purple-900 rounded-full border-4 border-pink-400 shadow-lg flex items-center justify-center cursor-pointer hover:shadow-xl transition transform hover:scale-105"
                >
                  <span className="text-3xl font-bold text-pink-300">●</span>
                </div>
              ))}
            </div>

            {/* Store boxes */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-purple-800/50 p-4 rounded-lg border-2 border-yellow-400 text-center">
                <p className="text-sm text-gray-300 mb-1">Kho Người 1</p>
                <p className="text-4xl font-bold text-yellow-400">{score.player1}</p>
              </div>
              <div className="bg-purple-800/50 p-4 rounded-lg border-2 border-cyan-400 text-center">
                <p className="text-sm text-gray-300 mb-1">Kho Người 2</p>
                <p className="text-4xl font-bold text-cyan-400">{score.player2}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20 gap-4">
            <div className="text-gray-300 flex-1">
              <p className="font-semibold">Trạng thái: <span className="text-purple-400">{gameStatus}</span></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGameStatus("Đang chơi");
                  setScore({ player1: 0, player2: 0 });
                }}
                className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-2 rounded-lg transition transform hover:scale-105"
              >
                🎮 Bắt đầu
              </button>
              <button
                onClick={() => setGameStatus("Dừng")}
                className="bg-linear-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold px-6 py-2 rounded-lg transition transform hover:scale-105"
              >
                ⏹️ Dừng
              </button>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="mt-12 max-w-4xl bg-linear-to-r from-slate-900/50 to-blue-900/50 p-6 rounded-lg border border-cyan-500/20">
          <h3 className="text-xl font-bold text-cyan-400 mb-3">ℹ️ Cách chơi</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Mỗi ô chứa một số hạt mề</li>
            <li>• Người chơi lần lượt chọn một ô và rải hạt theo chiều kim đồng hồ</li>
            <li>• Nếu hạt cuối cùng rơi vào kho của bạn, bạn được thêm một lượt</li>
            <li>• Người chơi nào có điểm cao hơn khi hết hạt sẽ thắng</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
