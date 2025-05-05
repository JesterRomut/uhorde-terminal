<script>
    import Loader from "$lib/components/Loader.svelte";
    import TypewriterElemental from "$lib/components/typewriter/TypewriterElemental.svelte";

    let { children } = $props();
</script>

<Loader>
    <TypewriterElemental time={100}>
        {@render children()}</TypewriterElemental
    >
</Loader>
