<script>
    import "../app.css";

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

<div
    class="left-1/2 top-1/2 transform-[translateX(-50%)_translateY(-50%)] inline-grid absolute bg-gray-950 grid-cols-[2rem_80vw_2rem] grid-rows-[2rem_80vh_2rem] [--pattern-fg:var(--color-stone-500)]"
>
    <div
        class="inline-grid -screen-container col-start-2 row-start-2 w-full h-full p-2 bg-stone-500 place-items-stretch"
    >
        <div
            class="-overlay1 col-start-1 top-0 left-0 z-index-1 bg-size-cover pointer-events-none mix-blend-multiply bg-[image:repeating-linear-gradient(180deg,_rgba(0,_0,_0,_0),_rgba(0,_0,_0,_.2)_50%,_rgba(0,_0,_0,_0))] bg-[size:auto_8px] min-w-full min-h-full max-w-full max-h-full"
        ></div>
        <div
            class="-overlay2 top-0 left-0 z-index-1 bg-size-cover pointer-events-none bg-[image:repeating-linear-gradient(180deg,_rgba(0,_0,_0,_0),_rgba(0,_0,_0,_.3)_50%,_rgba(0,_0,_0,_0))] min-w-full min-h-full max-w-full max-h-full"
        ></div>
        <div
            class="-overlay3 animate-[pulse_6s_ease-in-out_infinite] top-0 left-0 z-index-2 bg-size-cover pointer-events-none mix-blend-screen bg-[image:radial-gradient(farthest-corner,_var(--color-slate-800),_var(--color-gray-950))] min-w-full min-h-full max-w-full max-h-full"
        ></div>
        <div
            class="-screen rounded-xl p-10 max-w-full max-h-full overflow-auto text-sm/7 bg-gray-950 text-slate-300"
        >
            {@render children()}
        </div>
    </div>

    <div
        class="relative -right-px col-start-3 row-start-1 row-end-4 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"
    ></div>
    <div
        class="relative -left-px col-start-1 row-start-1 row-end-4 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"
    ></div>
    <div
        class="relative -bottom-px col-start-2 row-start-3 bg-(--pattern-fg)"
    ></div>
    <div
        class="relative -top-px col-start-2 row-start-1 bg-(--pattern-fg)"
    ></div>
</div>

<style>
    /* .-screen-container {
        grid-template-areas:
            "overlay1"
            "overlay2"
            "screen";
    }
    .-overlay1 {
        grid-area: overlay1;
    }

    .-overlay2 {
        grid-area: overlay2;
    }
    .-screen {
        grid-area: screen;
    } */
    @font-face {
        src:
            url("/fonts/MapleMonoNormalNL[wght].ttf")
                format("truetype-variations"),
            url("/fonts/MapleMonoNormalNL-Italic[wght].ttf")
                format("truetype-variations");
        font-family: "Maple";
        font-style: normal italic;
        font-weight: 400;
    }
    * {
        font-family: Maple;
        font-weight: "400";
    }
    .-screen-container {
        align-self: stretch;
    }

    .-screen-container > .-overlay1,
    .-screen-container > .-overlay2,
    .-screen-container > .-overlay3,
    .-screen-container > .-screen {
        /* 还可以简写为 grid-area: 1 / 2 */
        grid-area: 1 / 1 / 2 / 2;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;

        border-radius: 5px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(
            transparent,
            var(--color-stone-500),
            transparent
        );

        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>
