<script>
    import "./Modal.scss";
    import sign from "./assets/sign.svg";
    import taco from "./assets/taco.svg";
    import { fade } from "svelte/transition";

    export let isOpen = false;
    export let title = "Modal Title";
</script>

{#if isOpen}
    <div class="modal" transition:fade={{ duration: 300 }}>

        <div class="modal-content">
            <div class="modal-header">
                <img src={sign} alt="Sign" />
                <div>
                    <img id="taco" src={taco} alt="Taco" />
                    <h2>{title}</h2>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
{/if}
