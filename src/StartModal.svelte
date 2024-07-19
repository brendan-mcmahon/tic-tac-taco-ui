<script lang="ts">
    import Clickable from "./Clickable.svelte";

    export let onJoinGame = (gameId: string, playerName: string) => {};
    export let onCreateGame = (playerName: string) => {};

    let gameId = "";
    let playerName = "";
    let mode = "create";
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
        <button on:click={() => onJoinGame(gameId, playerName)}
            >Join Game</button
        >
    {/if}

    {#if mode === "create"}
        <button class="create-game" on:click={() => onCreateGame(playerName)}>
            Create Game
        </button>
    {/if}
</div>
