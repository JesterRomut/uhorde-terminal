<svelte:options customElement={{ tag: "card-collectible", shadow: "none" }} />

<script>
    let { card } = $props();
</script>

<span>111 {card}</span>
