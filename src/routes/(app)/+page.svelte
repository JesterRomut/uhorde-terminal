<script>
    // @ts-nocheck

    import LoadingText from "$lib/components/LoadingText.svelte";
    import { writable } from "svelte/store";
    import { cards, terminal } from "./+layout.svelte";

    const tabRegistry = new Map([
        [
            "main",
            {
                tab: async () => import("$lib/data/tabs/Main.svelte"),
                load: async () =>
                    (await import("$lib/data/tabs/main.js")).default(),
            },
        ],
        [
            "manual",
            {
                tab: async () => import("$lib/data/tabs/manual/Manual.svelte"),
                load: async () =>
                    (await import("$lib/data/tabs/manual/manual")).default(),
            },
        ],
    ]);

    let tab = writable("main");
    let entry = $derived(tabRegistry.get($tab));
</script>

{#if entry}
    {#await entry.load()}
        <LoadingText>加载资源...</LoadingText>
    {:then loaded}
        {#await entry.tab()}
            <LoadingText>加载页面...</LoadingText>
        {:then Tab}
            <Tab.default
                data={loaded}
                context={{
                    cards: cards,
                    terminal: terminal,
                    tab: tab,
                }}
            ></Tab.default>
        {/await}
    {/await}
{/if}
