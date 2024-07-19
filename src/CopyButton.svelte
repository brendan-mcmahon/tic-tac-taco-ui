<script lang="ts">
    import copyIcon from "./assets/icons/copy.svg";
    import "./CopyButton.scss";
    import Clickable from "./Clickable.svelte";
    export let stringToCopy: string;
</script>

<Clickable
    tabIndex={0}
    handleClick={() => navigator.clipboard.writeText(stringToCopy)}
    className="icon-button"
    id="copy-button"
    isDisabled={false}
>
    <img src={copyIcon} alt="Description of the icon" />
</Clickable>
