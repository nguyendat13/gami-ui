"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SIZE = 15;

export default function CaroPage() {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(""))
  );
  const [turn, setTurn] = useState<"X" | "O">("X");

  const handleMove = (r: number, c: number) => {
    if (board[r][c]) return;
    const newBoard = board.map((row, i) =>
      i === r ? row.map((cell, j) => (j === c ? turn : cell)) : row
    );
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/wood-bg.jpg')] bg-cover bg-center text-[#2d1e0f]">
      {/* ✅ Navbar cố định */}
      <nav className="fixed top-0 left-0 right-0 bg-[#5b3a29]/90 backdrop-blur-sm text-white flex items-center justify-between px-4 py-3 shadow-lg z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#7b4a33] px-4 py-2 rounded-md shadow-md hover:bg-[#9c5a3f] transition"
        >
          <ArrowLeft size={20} />
          <span>Trang chủ</span>
        </Link>

        <h1 className="font-serif text-xl font-semibold drop-shadow">GamiVN</h1>
      </nav>

      {/* ✅ Thêm padding-top để tránh bị che */}
      <main className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6 pt-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center font-serif drop-shadow-md">
          Cờ Caro
        </h2>

        <div
          className="grid border-4 border-[#5b3a29] rounded-xl shadow-2xl overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
            width: "min(95vw, 90vh)",
            aspectRatio: "1 / 1",
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => handleMove(r, c)}
                className="flex items-center justify-center border border-[#8c6746] bg-[#fff9f0] text-2xl sm:text-3xl cursor-pointer hover:bg-[#e6ccb2] transition-colors select-none"
              >
                {cell && (
                  <span
                    className={`font-bold ${
                      cell === "X"
                        ? "text-red-700 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                        : "text-blue-800 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                    }`}
                  >
                    {cell}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-lg font-semibold bg-[#fff9f0]/70 px-4 py-2 rounded-lg shadow">
          Lượt hiện tại:{" "}
          <span
            className={
              turn === "X" ? "text-red-700 font-bold" : "text-blue-800 font-bold"
            }
          >
            {turn}
          </span>
        </div>
      </main>
    </div>
  );
}
