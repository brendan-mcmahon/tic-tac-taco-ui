
export type Player = {
    name: string;
    id: string;
    icon: string;
};

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