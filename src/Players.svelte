<script lang="ts">
    import { iconMap } from "./iconMap";
    export let gameState;
</script>

<div class="players">
    <h3>Players</h3>
    <ul>
      {#if gameState.id}
        {#each gameState.players as player}
          <li class:active={gameState.currentPlayerId === player.id}>
            <p>{player.name}</p> <img src={iconMap[player.icon]}  alt={player.icon}/>
          </li>
        {/each}
      {:else}
        <li>Waiting for players...</li>
      {/if}
    </ul>
  </div>