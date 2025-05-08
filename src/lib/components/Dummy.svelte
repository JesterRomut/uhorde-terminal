<script>
    import { onMount } from "svelte";

    let { onmount } = $props();

    onMount(() => {
        onmount();
    });
</script>
