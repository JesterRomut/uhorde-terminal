<script>
    import { onMount } from "svelte";
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
{@render children()}
