// services/userService.ts
import { apiGet } from "@/utils/api";

export interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  roleId: number;
}

export interface GameStats {
  gameName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface UserStats {
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalWinRate: number;
  gamesByType: GameStats[];
}

export interface RecentGame {
  gameId: number;
  opponent: string;
  result: "Thắng" | "Thắng" | "Hòa";
  playedAt: string;
  type: string; // loại game: caro, chess, gomoku...
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;              // ← Mới thêm
  username: string;
  fullName?: string | null;    // ← Mới thêm (có thể null)
  totalGames: number;          // ← Đổi từ points sang totalGames
  wins: number;
  losses: number;              // ← Mới thêm
  draws: number;               // ← Mới thêm (nếu có hòa)
  winRate: number;             // ← Backend tính sẵn, % (ví dụ: 68.5)
}

// ===== User API =====

// Lấy thông tin người dùng theo ID
export const getUserById = async (userId: number, token: string): Promise<User> => {
  return await apiGet(`/User/${userId}`, token);
};

// Lấy thống kê người chơi (tổng số ván, thắng, thua, winrate, theo từng game)
export const getUserStats = async (userId: number, token: string): Promise<UserStats> => {
  return await apiGet(`/User/${userId}/stats`, token);
};

// Lấy danh sách các trận gần đây của user
export const getRecentGames = async (userId: number, token: string): Promise<RecentGame[]> => {
  return await apiGet(`/GameStats/recent/${userId}`, token);
};

// Lấy leaderboard theo loại game (caro, chess, gomoku, ...)
export const getLeaderboard = async (gameType: string, token: string): Promise<LeaderboardEntry[]> => {
  return await apiGet(`/GameStats/leaderboard/${gameType}`, token);
};
