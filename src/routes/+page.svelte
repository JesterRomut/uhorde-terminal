<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    //let { data } = $props();

    let isLoading = $state(true);
    onMount(() => {
        isLoading = false;
    });
    //console.log(data);
</script>

<svelte:head>
    <link rel="preload" href="/images/IMG_2860_zh.png" as="image" />
</svelte:head>

{#if isLoading}
    Loading...
{:else}
    Loaded!
{/if}
<a href="/">> [MANUAL]</a>
<br />
<a href="/">> [START SIMULATION]</a>

<i>I love you</i>
