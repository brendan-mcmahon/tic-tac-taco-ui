<script>
    import { fade } from "svelte/transition";
    export let isOpen = false;
</script>

{#if isOpen}
    <div class="overlay" transition:fade={{ duration: 300 }}>
        <h2>Waiting for Player 2...</h2>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        pointer-events: none;
    }

    h2 {
        font-size: 2rem;
        color: white;
        width: 80%;
    }
</style>
