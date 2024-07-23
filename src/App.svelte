<script lang="ts">
  import "./styles/app.scss";
  import { gameState, startModalOpen, gameOverModalOpen } from "./socketEvents";
  import {
    player,
    joinGame,
    createGame,
    leaveGame,
    rematch,
    makeMove,
  } from "./playerStore";
  import {
    getGameUrl,
    getWinner,
    getCurrentPlayerName,
  } from "./utilities/gameUtils";
  import Board from "./Board.svelte";
  import Players from "./Players.svelte";
  import CopyButton from "./CopyButton.svelte";
  import Modal from "./Modal.svelte";
  import GameOverModal from "./GameOverModal.svelte";
  import StartModal from "./StartModal.svelte";

  $: currentPlayerName = getCurrentPlayerName($gameState, $player?.id);
  $: winner = getWinner($gameState);
  $: gameUrl = getGameUrl($gameState);
</script>

<Modal isOpen={$startModalOpen} title="Tic-Tac-Taco">
  <StartModal onJoinGame={joinGame} onCreateGame={createGame} />
</Modal>

<Modal isOpen={$gameOverModalOpen} title="Game Over">
  <GameOverModal
    onRematch={() => rematch($gameState?.id, $player)}
    onNewGame={() => leaveGame($gameState?.id, $player)}
    isTieGame={$gameState?.isTieGame}
    {winner}
  />
</Modal>

<div id="Game">
  <h1>Tic-Tac-O</h1>
  {#if $gameState?.status === "waiting"}
    <div id="game-id">
      <h2>Send this link to a friend to start playing!</h2>
      <h2 id="copy-id">
        {$gameState?.id}
        <CopyButton stringToCopy={gameUrl} />
      </h2>
    </div>
  {/if}
  {#if $gameState}
    {#if currentPlayerName}
      {#if $gameState.status === "playing"}
        <h2 id="turn-indicator">{currentPlayerName} Turn!</h2>
      {/if}
      {#if $gameState.status === "waiting"}
        <h2 id="turn-indicator">Waiting for Player 2...</h2>
      {/if}
    {/if}
    <Board gameState={$gameState} player={$player} {makeMove} />

    {#if $gameState?.status === "playing"}
      <Players gameState={$gameState} />
    {/if}
  {/if}
</div>
