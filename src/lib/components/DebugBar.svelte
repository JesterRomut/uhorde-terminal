<script lang="ts">
    import { cardRegistry, type CardId } from "$lib/data/cards";
    import type { AppState } from "$lib/types";
    import { goto, invalidate } from "$app/navigation";
    import { tabRegistry, type TabId } from "$lib/data/tabs";

    let { context }: { context: AppState } = $props();
    let { cards } = context;

    let showPanel = $state(false);

    let gotoValue = $state("main");

    let giveValue = $state("character:uhrwerk");
</script>

<!-- svelte-ignore a11y_invalid_attribute -->
<a
    href="javascript:;"
    onclick={() => {
        showPanel = !showPanel;
    }}
    class="relative z-100 hover:text-amber-200">DEBUG MODE</a
>

{#snippet gotoOptions()}
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
        href="javascript:;"
        class="hover:text-amber-200"
        onclick={() => {
            if (gotoValue) context.tab.set(gotoValue as TabId);
        }}>GOTO</a
    >
    <select bind:value={gotoValue}>
        {#each Object.keys(tabRegistry.registry) as tabId}
            <option value={tabId}>{tabId}</option>
        {/each}
    </select>
{/snippet}

{#snippet giveOptions()}
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a
        href="javascript:;"
        class="hover:text-amber-200"
        onclick={() => {
            if (giveValue)
                cards.set($cards.concat({ type: giveValue as CardId }));
        }}>GIVE</a
    >
    <select bind:value={giveValue}>
        {#each Object.keys(cardRegistry.registry) as cardId}
            <option value={cardId}>{cardId}</option>
        {/each}
    </select>
{/snippet}

{#if showPanel}
    <div
        class="absolute bottom-0 flex items-center justify-evenly z-100 bg-black w-full"
    >
        <div>
            {@render gotoOptions()}
        </div>
        <div>
            {@render giveOptions()}
        </div>
        <div>
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a
                href="javascript:;"
                class="hover:text-amber-200"
                onclick={() => {
                    //sessionStorage.removeItem("debug");
                    goto("/");
                }}>EXIT-DEBUG</a
            >
        </div>
    </div>
{/if}
