<script>
    import { onMount } from "svelte";
    import LoaderSpinner from "./LoaderSpinner.svelte";

    let { children } = $props();

    let isLoading = $state(true);
    onMount(() => {
        isLoading = false;
    });
</script>

{#if isLoading}
    <LoaderSpinner /> 加载中...
{:else if children}
    {@render children()}
{:else}
    Loaded!
{/if}
