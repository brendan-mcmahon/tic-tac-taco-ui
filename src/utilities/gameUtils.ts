import type { GameState } from "../models/GameState";
import type { Player } from "../models/Player";

export function getWinner(gameState: GameState): string | undefined {
    const winnerPlayer = gameState?.players?.find(p => p.id === gameState?.winner);
    return winnerPlayer?.name;
}

export function getGameUrl(gameState: GameState): string {
    return `${window.location.origin}?gameId=${gameState?.id}`;
}

export function getCurrentPlayerName(gameState: GameState, playerId: string) {
    return gameState?.currentPlayerId === playerId
        ? "Your"
        : gameState?.players.find((p: Player) => p.id !== playerId)?.name + "'s";
}