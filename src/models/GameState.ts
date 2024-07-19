import type { Player } from "./Player";

export type GameState = {
    id: string;
    board: string[];
    currentPlayerId: string;
    winner: string | null;
    players: Player[];
    winningCombination: number[];
    status: string;
    isTieGame: boolean;
};

export const initialGameState: GameState ={
    id: "",
    status: "waiting",
    players: [],
    currentPlayerId: "",
    board: [],
    winner: null,
    winningCombination: [],
    isTieGame: false,
  }