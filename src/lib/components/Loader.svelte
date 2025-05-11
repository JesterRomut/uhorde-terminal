<script>
    import { onMount } from "svelte";
    import LoadingText from "./LoadingText.svelte";

    let { children } = $props();

    let isLoading = $state(true);
    onMount(() => {
        isLoading = false;
    });
</script>

{#if isLoading}
    <LoadingText />
{:else if children}
    {@render children()}
{:else}
    Loaded!
{/if}
