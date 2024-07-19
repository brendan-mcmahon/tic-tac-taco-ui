<script lang="ts">
    export let tabIndex: number;
    export let isDisabled: boolean;
    export let handleClick: () => void;
    export let id: string | null;
    export let className: string | null;

</script>

<div
    id={id}
    tabindex={tabIndex}
    class={`clickable ${className}`}
    class:disabled={isDisabled}
    on:click={handleClick}
    on:keydown={(event) => {
        if (event.key === "Enter" || event.key === " ") handleClick();
    }}
    role="button"
>
    <slot></slot>
</div>
