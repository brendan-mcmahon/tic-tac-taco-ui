<script lang="ts">
  import io from "socket.io-client";
  import { v4 as uuidv4 } from "uuid";
  import StartModal from "./StartModal.svelte";
  import { writable } from "svelte/store";
  import Board from "./Board.svelte";
  import type { GameState, Player } from "./models";
  import GameOverModal from "./GameOverModal.svelte";

  import "./app.scss";
  import CopyButton from "./CopyButton.svelte";
  import Players from "./Players.svelte";
  import Modal from "./Modal.svelte";
    import Waiting from "./Waiting.svelte";

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const socket = io(apiUrl);

  const gameState = writable<GameState>();

  let player = writable<Player>();

  let startModalOpen = writable<boolean>(true);
  let gameOverModalOpen = writable<boolean>(false);

  socket.on("gameState", (state) => {
    gameState.set({
      ...state,
    });
    startModalOpen.set(false);
    gameOverModalOpen.set(state.status === "finished");
  });

  socket.on("gameDeleted", () => {
    gameState.set({
      id: "",
      status: "waiting",
      players: [],
      currentPlayerId: "",
      board: [],
      winner: null,
      winningCombination: [],
      isTieGame: false,
    });
    gameOverModalOpen.set(false);
    startModalOpen.set(true);
  });

  socket.on("playerDisconnected", (data) => {
    console.log("player disconnected", data["player_name"]);
  });

  const makeMove = (index: number) => {
    socket.emit("makeMove", {
      gameId: $gameState.id,
      index,
      playerId: $player.id,
    });
  };

  const joinGame = (gameId: string, _playerName: string) => {
    player.set({ name: _playerName, id: uuidv4(), icon: "" });
    socket.emit("joinGame", { gameId, player: $player });
  };

  const createGame = (_playerName: string) => {
    player.set({ name: _playerName, id: uuidv4(), icon: "" });
    socket.emit("createGame", { player: $player });
  };

  const leaveGame = () => {
    socket.emit("leaveGame", { gameId: $gameState.id, player: $player });
  };

  const rematch = () => {
    socket.emit("rematch", { gameId: $gameState.id, player: $player });
  };

  $: getWinner = (): string =>
    $gameState?.players?.filter((p) => p.id === $gameState?.winner)[0]?.name;

  $: getGameUrl = (): string => {
    return `${window.location.origin}?gameId=${$gameState?.id}`;
  };
</script>

<div id="Game">
  <h1>Tic-Tac-O</h1>
  <h2 id="game-id">
    {$gameState?.id}
    <CopyButton stringToCopy={getGameUrl()} />
  </h2>

  <Modal isOpen={$startModalOpen} title="Tic-Tac-Taco">
    <StartModal onJoinGame={joinGame} onCreateGame={createGame}  />
  </Modal>

  <Modal isOpen={$gameOverModalOpen} title="Game Over">
    <GameOverModal
      onRematch={rematch}
      onNewGame={leaveGame}
      isTieGame={$gameState?.isTieGame}
      winner={getWinner()}
    />
  </Modal>

  <Waiting isOpen={$gameState?.status === "waiting"} title="Waiting for player 2..." />

  {#if $gameState}
    <Board gameState={$gameState} player={$player} {makeMove} />

    <Players gameState={$gameState} />
  {/if}
</div>

<style lang="scss">
</style>
