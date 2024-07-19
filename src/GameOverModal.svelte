<script lang="ts">
    import "./styles/Modal.scss";

    export let isTieGame: boolean = false;
    export let winner: string | null = null;
    export let onRematch = () => {};
    export let onNewGame = () => {};
</script>

{#if isTieGame}
    <p>It's a tie!</p>
{:else}
    <p>{winner} wins!</p>
{/if}
<div class="input-group">
    <button on:click={onRematch}>Rematch</button>
    <button on:click={onNewGame}>New Game</button>
</div>

<style lang="scss">
    .input-group {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    p {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 32px;
    }
</style>
