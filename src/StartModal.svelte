<script lang="ts">
    import { onMount } from "svelte";
    import Clickable from "./Clickable.svelte";

    let gameId: string = "";
    let playerName: string = "";
    let mode: string = "create";

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const _gameId = urlParams.get("gameId");
        if (_gameId) {
            gameId = _gameId;
            mode = "join";
        }
    });

    export let onJoinGame = (gameId: string, playerName: string) => {};
    export let onCreateGame = (playerName: string) => {};
</script>

<div class="input-group">
    <div class="radio-group">
        <Clickable
            tabIndex={1}
            handleClick={() => (mode = "create")}
            className={`radio ${mode === "create" ? "selected" : ""}`}
            isDisabled={false}
            id="create-game-radio"
        >
            Create New Game
        </Clickable>

        <Clickable
            tabIndex={2}
            handleClick={() => (mode = "join")}
            className={`radio ${mode === "join" ? "selected" : ""}`}
            isDisabled={false}
            id="join-game-radio"
        >
            Join Existing Game
        </Clickable>
    </div>

    <input
        type="text"
        placeholder="Enter Your Name"
        bind:value={playerName}
        class="input-full"
    />

    {#if mode === "join"}
        <input type="text" placeholder="Enter Game ID" bind:value={gameId} />
        <button
            disabled={playerName == ""}
            on:click={() => onJoinGame(gameId, playerName)}>Join Game</button
        >
    {/if}

    {#if mode === "create"}
        <button
            disabled={playerName == ""}
            class="create-game"
            on:click={() => onCreateGame(playerName)}
        >
            Create Game
        </button>
    {/if}
</div>
