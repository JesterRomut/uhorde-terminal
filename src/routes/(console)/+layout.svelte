<script>
    import ConsoleScreen from "$lib/components/ConsoleScreen.svelte";
    import "../../app.css";

    let { children } = $props();
    // const decent = "bg-gray-950";
    // const accent = "bg-stone-500";
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
    <title>LogOS 1.2.EFC_12492_2775293581</title>
    <!-- <link rel="preload" href="/fonts/MapleMonoNormalNL[wght].ttf" as="font" />
    <link
        rel="preload"
        href="/fonts/MapleMonoNormalNL-Italic[wght].ttf"
        as="font"
    /> -->
    <!-- <link
        rel="stylesheet"
        href="https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Regular/result.css"
    /> -->
</svelte:head>
<!-- 
<Cardboard /> -->

<ConsoleScreen>{@render children()}</ConsoleScreen>
