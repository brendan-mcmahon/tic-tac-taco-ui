<script lang="ts">
    import shareIcon from "./assets/icons/share.svg";
    import "./styles/ShareButton.scss";
    import Clickable from "./Clickable.svelte";
    export let url = "";

    function share() {
        if (navigator.share) {
            navigator
                .share({
                    title: document.title,
                    url,
                })
                .catch((error) => {
                    console.error("Error sharing link:", error);
                });
        } else {
            console.error("Web Share API not supported");
        }
    }
</script>

<Clickable
    tabIndex={0}
    handleClick={share}
    className="icon-button"
    id="share-button"
    isDisabled={false}
>
    <img src={shareIcon} alt="" />
</Clickable>
