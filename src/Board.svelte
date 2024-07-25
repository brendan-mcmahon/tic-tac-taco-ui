<script lang="ts">
    import Clickable from "./Clickable.svelte";
    import { iconMap } from "./utilities/iconMap";
    import type { Player } from "./models/Player";
    export let gameState;
    export let makeMove;
    export let player;

    $: handleClick = (index: number) => {
        if (!isDisabled(index)) {
            makeMove(index, gameState?.id, player?.id);
        }
    };

    $: isDisabled = (index: number) => {
        const valueExists = !!gameState.board[index];
        const isCurrentPlayer = gameState.currentPlayerId === player?.id;
        const gameIsFinished = gameState.status === "finished";
        const gameHasTwoPlayers = gameState.players.length === 2;

        return (
            valueExists ||
            !isCurrentPlayer ||
            gameIsFinished ||
            !gameHasTwoPlayers
        );
    };

    $: getPlayerIcon = (playerId: string) => {
        const iconKey = playerId
            ? gameState.players.find((p: Player) => p.id === playerId)?.icon
            : null;
        return iconKey ? iconMap[iconKey] : "";
    };
</script>

<div class="board">
    {#each gameState.board as value, index}
        <div class="square-container">
            <div
                class="square-overlay"
                class:visible={(gameState?.status === "waiting" ||
                    gameState?.currentPlayerId !== player?.id) &&
                    gameState?.status !== "finished"}
            ></div>
            <Clickable
                className={`square ${gameState.winningCombination?.includes(index) ? "winner" : ""}`}
                id={`square-${index}`}
                tabIndex={index + 1}
                isDisabled={isDisabled(index)}
                handleClick={() => handleClick(index)}
            >
                <img src={getPlayerIcon(value) || ""} alt={value} />
            </Clickable>
        </div>
    {/each}
</div>
