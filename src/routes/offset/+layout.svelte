<script>
    import Loader from "$lib/components/Loader.svelte";

    let { children } = $props();
</script>

<Loader>
    {@render children()}
</Loader>
