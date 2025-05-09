<script module>
    // export const terminal = () => _terminal;
    // /**@type {Element | undefined}*/
    // let _terminal = $state();

    // export const cardboard = {
    //     get cards() {
    //         return _cards;
    //     },
    //     set cards(value) {
    //         _cards = value;
    //     },
    // };
    // /**@type {import("$lib/components/cardboard/Card.svelte").CardInstance[]}*/
    // let _cards = $state([]);
    // /**@type {import("svelte").SvelteComponent | undefined}*/
    //let _cardboard = $state();
    //let _cardboardEnabled = $state(false);

    /**@type {Element | undefined}*/
    let _terminal = $state();

    export const terminal = () => _terminal;
</script>

<script>
    import ConsoleScreen from "$lib/components/ConsoleScreen.svelte";
    import { getContext, onMount, setContext } from "svelte";
    import "../../app.css";
    import { m } from "$lib/paraglide/messages";

    let { children } = $props();
    // const decent = "bg-gray-950";
    // const accent = "bg-stone-500";

    onMount(() => {});
</script>

<!-- <svelte:body
    use:classList={[
        "bg-gray-950",
        // `bg-[image:repeating-linear-gradient(315deg,_${accent}_1px,_transparent_1px)]`,
        // "bg-[size:10px_10px]",
        // "bg-fixed",
    ]}
/> -->

<svelte:head>
    <title>{m.direct_major_felix_fulfill()}</title>
    <link rel="preconnect" href="https://fontsapi.zeoseven.com" />
    <link
        rel="stylesheet"
        href="https://fontsapi.zeoseven.com/184/main/result.css"
        onerror={() => {
            this.href =
                "https://fontsapi-storage.zeoseven.com/184/main/result.css";
        }}
    />
    <!-- <link rel="preload" href="/fonts/MapleMonoNormalNL[wght].ttf" as="font" />
    <link
        rel="preload"
        href="/fonts/MapleMonoNormalNL-Italic[wght].ttf"
        as="font"
    /> -->
</svelte:head>
<!-- 
<Cardboard /> -->

<ConsoleScreen bind:screen={_terminal}>{@render children()}</ConsoleScreen>
