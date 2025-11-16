import { apiPost, apiDelete } from '@/utils/api';

export interface MoveDetailDTO {
  x: number;
  y: number;
  playerType: string; // "Player" hoặc "Bot"
}

export interface GameMoveDTO {
  success: boolean;         // tương ứng Success
  message: string;          // tương ứng Message
  playerMove: MoveDetailDTO;
  botMove?: MoveDetailDTO | null;
}


export interface GameDTO {
  gameId: number;
  playerXId: number;
  playerOId?: number | null;
  status: string;
  winnerId: number | null;
  createdAt: string;
  updatedAt?: string;
  moves: MoveDetailDTO[];
}



export interface GameMoveCreateDTO {
  gameId: number;
  playerId: number;
  x: number;
  y: number;
}

// Tạo game mới
export async function createOfflineGame(
  playerId: number,
  token?: string
): Promise<GameDTO> {
  try {
    const result = await apiPost(
      `/offline-game/create?playerId=${playerId}`,
      {},
      token
    );
    return result;
  } catch (error) {
    throw error;
  }
}

// Thực hiện nước đi
export async function makeMoveAsync(
  moveDto: GameMoveCreateDTO,
  token?: string
): Promise<GameMoveDTO> {
  try {
    const result = await apiPost(
      '/offline-game/move',
      moveDto,
      token
    );
    return result;
  } catch (error) {
    throw error;
  }
}

// Xóa game
export async function deleteGame(
  gameId: number,
  token?: string
): Promise<void> {
  try {
    await apiDelete(
      `/offline-game/delete-game/${gameId}`,
      token
    );
  } catch (error) {
    throw error;
  }
}