import { writable } from "svelte/store";
import { socket } from './socketEvents';
import { v4 as uuidv4 } from "uuid";
import type { Player } from "./models/Player";

let player = writable<Player>();

const joinGame = (gameId: string, playerName: string) => {
    const newPlayer = { name: playerName, id: uuidv4(), icon: "" };
    player.set(newPlayer);
    socket.emit("joinGame", { gameId, player: newPlayer });
};

const createGame = (playerName: string) => {
    const newPlayer = { name: playerName, id: uuidv4(), icon: "" };
    player.set(newPlayer);
    socket.emit("createGame", { player: newPlayer });
};

const leaveGame = (gameId: string, player: Player) => {
    socket.emit("leaveGame", { gameId,player });
};

const rematch = (gameId: string, player: Player) => {
    socket.emit("rematch", { gameId, player });
};

const makeMove = (index: number, gameId: string, playerId: string) => {
    socket.emit("makeMove", { gameId, index, playerId });
};

export { player, joinGame, createGame, leaveGame, rematch, makeMove };
