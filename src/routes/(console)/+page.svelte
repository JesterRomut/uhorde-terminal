<script>
    import { goto } from "$app/navigation";
    import { CustomElementUtils } from "$lib/classes/Utils.js";
    import Loader from "$lib/components/Loader.svelte";
    import Logos from "$lib/components/Logos.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import Typewriter from "$lib/components/typewriter/Typewriter.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import { onMount } from "svelte";

    let { data } = $props();

    let roll = $state(data.codes.roll());

    let showLogo = $state(false);

    onMount(() => {
        CustomElementUtils.define("logos-logo", Logos.element);
    });
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
        <div class="inline-block absolute">
            <TypewriterMover time={20}>
                <p class="mt-0 mb-0">权限验证通过。</p>
                <logos-logo></logos-logo>
                <br />
                <p class="mt-0 mb-0">LogOS v1.2.EFC_12492_2775293581</p>
            </TypewriterMover>
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
                text: "[初始化 / INITIALIZE]",
                waitingTime: 1000,
                onclick: (e) => {
                    goto("/offset/1");
                },
            },
        ]}
    />
</Loader>
