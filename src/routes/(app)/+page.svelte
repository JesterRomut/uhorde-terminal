<script lang="ts">
    import LoadingText from "$lib/components/LoadingText.svelte";
    import { writable, type Writable } from "svelte/store";
    import { onMount } from "svelte";
    import ConsoleScreen from "$lib/components/ConsoleScreen.svelte";
    import Cardboard from "$lib/components/cardboard/Cardboard.svelte";
    import DebugBar from "$lib/components/DebugBar.svelte";
    import type { CardInstance } from "$lib/types/card";
    import type { AppState } from "$lib/types";
    import { page } from "$app/state";
    import { tabRegistry, type TabId } from "$lib/data/tabs";

    let tab = writable<TabId>("main");
    let entry = $derived(tabRegistry.get($tab));

    let _terminal: Element | undefined = $state();

    const terminal = () => _terminal;

    const cards: Writable<CardInstance[]> = writable([]);

    let debugMode = $derived(page.url.searchParams.has("debug"));
</script>

{#if debugMode}
    <DebugBar
        context={{
            cards: cards,
            terminal: terminal,
            tab: tab,
        } as AppState}
    />
{/if}
<ConsoleScreen bind:screen={_terminal}>
    {#if entry}
        {#await entry.load()}
            <LoadingText>加载资源...</LoadingText>
        {:then loaded}
            {#await entry.tab()}
                <LoadingText>加载页面...</LoadingText>
            {:then Tab}
                <Tab.default
                    data={loaded as any}
                    context={{
                        cards: cards,
                        terminal: terminal,
                        tab: tab,
                    } as AppState}
                ></Tab.default>
            {/await}
        {/await}
    {/if}
</ConsoleScreen>

<Cardboard bind:cards={$cards}></Cardboard>
