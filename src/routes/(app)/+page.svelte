<script lang="ts">
    import LoadingText from "$lib/components/LoadingText.svelte";
    import { writable, type Writable } from "svelte/store";
    import ConsoleScreen from "$lib/components/ConsoleScreen.svelte";
    import Cardboard from "$lib/components/cardboard/Cardboard.svelte";
    import DebugBar from "$lib/components/DebugBar.svelte";
    import type { CardInstance } from "$lib/types/card";
    import type { TabNavigator } from "$lib/types/tab.js";
    import { tabRegistry, type TabId } from "$lib/data/tabs";

    let tab = writable<TabId>("main");

    interface TabRegistryData {
        tab(): Promise<any>;
        load?(): Promise<any>;
    }

    let entry = $derived(tabRegistry.get($tab)) as TabRegistryData;

    let _terminal: Element | undefined = $state();

    const terminal = () => _terminal;

    const cards: Writable<CardInstance[]> = writable([]);

    let { data } = $props();

    const navigator: () => TabNavigator = () => {
        return {
            context: {
                cards: cards,
                terminal: terminal,
                tab: tab,
            },
            goto(id) {
                tab.set(id);
            },
        };
    };
</script>

{#if data.debug}
    <DebugBar navigator={navigator()} />
{/if}
<ConsoleScreen bind:screen={_terminal}>
    {#if entry.load}
        {#await Promise.all([entry.load(), entry.tab()])}
            <LoadingText>加载中...</LoadingText>
        {:then [data, Tab]}
            <Tab.default {data} navigator={navigator()}></Tab.default>
        {/await}
    {:else}
        {#await entry.tab()}
            <LoadingText>加载中...</LoadingText>
        {:then Tab}
            <Tab.default navigator={navigator()}></Tab.default>
        {/await}
    {/if}
</ConsoleScreen>

<Cardboard bind:cards={$cards}></Cardboard>
