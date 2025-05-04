<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let { data } = $props();

    let isLoading = $state(true);
    onMount(() => {
        isLoading = false;
    });
    //console.log(data);
</script>

{isLoading}
{#await data.loaded}
    Loading...
{:then loaded}
    Loaded! {loaded}
{:catch error}
    {error.message}
{/await}
<a href="/">> [MANUAL]</a>
<br />
<a href="/">> [START SIMULATION]</a>

<i>I love you</i>
