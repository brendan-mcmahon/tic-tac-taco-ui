<script lang="ts">
    import Clickable from "./Clickable.svelte";
    import { iconMap } from "./iconMap";
    import type { Player } from "./models";
    import BoardOverlay from "./BoardOverlay.svelte";
    export let gameState;
    export let makeMove;
    export let player;

    $: handleClick = (index: number) => {
        if (!isDisabled(index)) {
            makeMove(index);
        }
    };

    $: isDisabled = (index: number) => {
        const valueExists = !!gameState.board[index];
        const isCurrentPlayer = gameState.currentPlayerId === player.id;
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

<BoardOverlay isOpen={gameState?.status === "waiting"} text="" />
<BoardOverlay isOpen={gameState?.currentPlayerId !== player.id} text=""/>

<div class="board">
    {#each gameState.board as value, index}
        <Clickable
            id={`square-${index}`}
            tabIndex={index + 1}
            isDisabled={isDisabled(index)}
            handleClick={() => handleClick(index)}
            className={`square ${gameState.winningCombination?.includes(index) ? "winner" : ""}`}
        >
            <img src={getPlayerIcon(value) || ""} alt={value} />
        </Clickable>
    {/each}
</div>
