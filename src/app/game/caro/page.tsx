"use client";

import { useState, useEffect } from "react";
import {
  createOfflineGame,
  makeMoveAsync,
  deleteGame,
} from "@/lib/gameService";
import { getUserId } from "@/utils/token";
import GameNavbar from "@/components/GameNavbar";

const SIZE = 15;

interface Move {
  player: string;
  x: number;
  y: number;
}

export default function CaroPage() {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: SIZE }, () => Array(SIZE).fill(""))
  );
  const [gameId, setGameId] = useState<number | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [status, setStatus] = useState<"waiting" | "playing" | "finished">(
    "waiting"
  );
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moves, setMoves] = useState<Move[]>([]);
const [mode, setMode] = useState<"offline" | "online" | null>(null);

  // Lấy playerId từ token khi component mount
  useEffect(() => {
    const userId = getUserId();
    setPlayerId(userId);
  }, []);

  // Lấy token từ localStorage
  const getToken = () => localStorage.getItem("token");

  // Tạo game mới
 const handleCreateGame = async (mode: "offline" | "online") => {
  if (!playerId) {
    setError("Không thể lấy playerId từ token");
    return;
  }

  setLoading(true);
  setError(null);
  try {
    // Reset board
    setBoard(Array.from({ length: SIZE }, () => Array(SIZE).fill("")));
    setStatus("waiting");
    setWinner(null);
    setMoves([]);
    setError(null);

    let result;

    if (mode === "offline") {
      // Gọi API offline hiện tại
      result = await createOfflineGame(playerId, getToken() || undefined);
    } else {
      // Tạm thời online chưa có backend, chỉ set state
      result = { gameId: Date.now() }; // fake gameId
    }

    setGameId(result.gameId);
    setStatus("playing");
    setWinner(null);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


 const handleMove = async (r: number, c: number) => {
  if (loading || status !== "playing" || board[r][c]) return;
  if (!gameId || !playerId) {
    setError("Vui lòng tạo game mới trước");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const moveData = { gameId, playerId, x: c, y: r };
    const result = await makeMoveAsync(moveData, getToken() || undefined);

    // Cập nhật board cho Player
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = "X";

    // Cập nhật board cho Bot nếu có
    if (result.botMove) {
      newBoard[result.botMove.y][result.botMove.x] = "O";
    }

    setBoard(newBoard);

    // Lưu moves
    const newMoves: Move[] = [{ player: "Player", x: c, y: r }];
    if (result.botMove) newMoves.push({ player: "Bot", x: result.botMove.x, y: result.botMove.y });
    setMoves((prev) => [...prev, ...newMoves]);

    // Kiểm tra thắng/hòa từ backend
    if (result.message.includes("chiến thắng")) {
      setWinner(result.message.includes("Bạn") ? "Player" : "Bot");
      setStatus("finished");
    } else if (result.message.includes("hòa")) {
      setWinner("Draw");
      setStatus("finished");
    }
  } catch (err: any) {
    setError(err.message || "Có lỗi xảy ra");
  } finally {
    setLoading(false);
  }
};


  // Xóa game
  const handleDeleteGame = async () => {
    if (!gameId) return;

    setLoading(true);
    try {
      await deleteGame(gameId, getToken() || undefined);
      resetGame();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset game
  const resetGame = () => {
    setGameId(null);
    setBoard(Array.from({ length: SIZE }, () => Array(SIZE).fill("")));
    setStatus("waiting");
    setWinner(null);
    setError(null);
    setMoves([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
           <GameNavbar gameName="Cờ Caro" gameIcon="🎯" />  
      {/* Header */}
      <header className="bg-black/50 border-b border-cyan-500/30 backdrop-blur-md p-4">

        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🎯 Cờ Caro
          </h1>
          <div className="flex gap-4">
            <span className="text-gray-400">Game ID: {gameId || "Chưa tạo"}</span>
            <span className="text-gray-400">Player ID: {playerId || "Đang tải..."}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 p-6 pt-20">
        {/* Tiêu đề */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            🎯 Cờ Caro
          </h2>
          <p className="text-gray-300 text-lg">
            Thách đấu bot, chinh phục bảng xếp hạng
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300 max-w-md">
            ⚠️ {error}
          </div>
        )}

        {/* Status message */}
        {winner && (
          <div
            className={`mb-6 p-4 rounded-lg border text-center font-bold text-lg ${
              winner === "Player"
                ? "bg-green-500/20 border-green-500 text-green-300"
                : winner === "Bot"
                ? "bg-red-500/20 border-red-500 text-red-300"
                : "bg-yellow-500/20 border-yellow-500 text-yellow-300"
            }`}
          >
            {winner === "Player" && "🎉 Bạn đã chiến thắng!"}
            {winner === "Bot" && "🤖 Bot đã chiến thắng!"}
            {winner === "Draw" && "🤝 Hòa cờ!"}
          </div>
        )}

        {/* Game board */}
        <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-cyan-500/30 mb-8">
          <div
            className="grid border-2 border-cyan-500/50 rounded-lg overflow-hidden shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
              width: "min(85vw, 500px)",
              aspectRatio: "1 / 1",
            }}
          >
            {board.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleMove(r, c)}
                  className={`flex items-center justify-center border border-slate-700/50 bg-slate-800 text-2xl sm:text-3xl cursor-pointer transition-all select-none ${
                    !cell && status === "playing" ? "hover:bg-slate-600" : ""
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {cell && (
                    <span
                      className={`font-bold drop-shadow-lg ${
                        cell === "X" ? "text-cyan-400" : "text-pink-400"
                      }`}
                    >
                      {cell}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap">
         {status === "waiting" || status === "finished" ? (
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => handleCreateGame("offline")}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🕹️ Chơi Offline
        </button>
        <button
          onClick={() => handleCreateGame("online")}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🌐 Chơi Online
        </button>
      </div>
    ) : (
  <>
    <button
      onClick={resetGame}
      disabled={loading}
      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
    >
      🔄 Reset
    </button>
    <button
      onClick={handleDeleteGame}
      disabled={loading}
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
    >
      ❌ Xóa Game
    </button>
  </>
)}

        </div>

        {/* Game info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md">
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm">Trạng thái</div>
            <div className="text-cyan-400 font-bold text-lg mt-1">
              {status === "waiting" && "⏳ Chờ"}
              {status === "playing" && "🎮 Đang chơi"}
              {status === "finished" && "🏁 Kết thúc"}
            </div>
          </div>
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm">Nước đi</div>
            <div className="text-blue-400 font-bold text-lg mt-1">{moves.length}</div>
          </div>
          <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm">Ô trống</div>
            <div className="text-green-400 font-bold text-lg mt-1">
              {board.flat().filter((cell) => !cell).length}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}