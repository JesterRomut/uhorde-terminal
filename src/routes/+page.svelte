<script>
    import { goto } from "$app/navigation";
    import Loader from "$lib/components/Loader.svelte";
    import Logos from "$lib/components/Logos.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import Typewriter from "$lib/components/typewriter/Typewriter.svelte";
    import TypewriterCustom from "$lib/components/typewriter/TypewriterCustom.svelte";
    import { elasticOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    let { data } = $props();

    //let code = data.codes.roll();

    let roll = $state(data.codes.roll());

    let showLogo = $state(false);
    // /**
    //  * @type {?number}
    //  */
    // let rollerId;
    // onMount(() => {
    //     rollerId = setInterval(() => {
    //         let result = data.codes.roll();
    //         roll = result ? result : "";
    //     }, 2000);
    // });

    // onDestroy(() => {
    //     if (rollerId) clearInterval(rollerId);
    // });
    //console.log(data);
</script>

<svelte:head>
    <!-- <link rel="preload" href={data.chargeBlade.img.src} as="image" /> -->
</svelte:head>

<Loader>
    <span>乌鸦为什么像写字台？</span>

    <div class="block h-1/12"></div>
    <span>> </span>
    <Typewriter
        time={100}
        onfinish={() => {
            showLogo = true;
        }}>{roll}</Typewriter
    >
    <!-- <TypewriterCustom
        time={100}
        onfinish={() => {
            showLogo = true;
        }}
        init={(e) => e.innerHTML}
        process={(_, __, arr, i) => {
            if (typeof arr != "string")
                throw TypeError(`not a string, got ${arr}`);
            return `[${arr.slice(0, i)}_]`;
        }}
        finish={(_, arr) => {
            if (typeof arr != "string")
                throw TypeError(`not a string, got ${arr}`);
            return arr;
        }}
    >
        {roll}
    </TypewriterCustom> -->
    <br />
    {#if showLogo}
        <div class="block absolute">
            权限验证通过。
            <br />
            <Logos />
            <br />
            LogOS v1.2.EFC_12492_2775293581
        </div>
    {/if}

    <div class="block h-1/2"></div>

    <TerminalChoice
        choices={[
            {
                text: "[手册 / MANUAL]",
                waitingTime: 1000,
                onclick: (e) => {
                    goto("/manual");
                },
            },
            {
                text: "[开始 / START]",
                waitingTime: 1000,
                onclick: (e) => {
                    goto("/offset/1");
                },
            },
        ]}
    />
</Loader>
