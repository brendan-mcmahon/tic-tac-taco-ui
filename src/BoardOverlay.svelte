<script>
    import { fade } from "svelte/transition";
    export let isOpen = false;
    export let text = "";
</script>

{#if isOpen}
    <div class="overlay" transition:fade={{ duration: 300 }}>
        <h2>{text}</h2>
    </div>
{/if}

<style>
    
</style>
