<script module>
    /**@type {import("$lib/components/cardboard/Card.svelte").CardInstance[]}*/
    let _cards = $state([]);

    export const cardboard = {
        get cards() {
            return _cards;
        },
        set cards(value) {
            _cards = value;
        },
    };
</script>

<script>
    import { page } from "$app/state";
    import Cardboard from "$lib/components/cardboard/Cardboard.svelte";
    import { locales, localizeHref } from "$lib/paraglide/runtime";

    import { onMount } from "svelte";

    let { children } = $props();

    onMount(() => {
        import("mobile-drag-drop").then(async (module) => {
            const { polyfill } = module;
            // optional import of scroll behaviour
            const { scrollBehaviourDragImageTranslateOverride } = await import(
                "mobile-drag-drop/scroll-behaviour"
            );
            // options are optional ;)
            polyfill({
                // use this to make use of the scroll behaviour
                dragImageTranslateOverride:
                    scrollBehaviourDragImageTranslateOverride,
            });
        });
    });
</script>

{@render children()}

<div style="display:none">
    {#each locales as locale}
        <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
    {/each}
</div>

<Cardboard bind:cards={_cards}></Cardboard>
