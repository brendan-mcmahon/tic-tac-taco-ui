import { writable } from "svelte/store";
import io from "socket.io-client";
import type { GameState } from "./models/GameState";
import { initialGameState } from "./models/GameState";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const socket = io(apiUrl);
const gameState = writable<GameState>();
const startModalOpen = writable<boolean>(true);
const gameOverModalOpen = writable<boolean>(false);

socket.on("gameState", (state: GameState) => {
    gameState.set(state);
    startModalOpen.set(false);
    gameOverModalOpen.set(state.status === "finished");
    console.log("gameState", state);
});

socket.on("gameDeleted", () => {
    gameState.set(initialGameState);
    gameOverModalOpen.set(false);
    startModalOpen.set(true);
});

socket.on("playerDisconnected", (data) => {
    console.log("player disconnected", data["player_name"]);
});

export { gameState, startModalOpen, gameOverModalOpen, socket };
