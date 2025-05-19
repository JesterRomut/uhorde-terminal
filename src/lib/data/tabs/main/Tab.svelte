<script lang="ts">
    import { goto } from "$app/navigation";
    import { CustomElementUtils } from "$lib/classes/Utils.js";
    import Loader from "$lib/components/Loader.svelte";
    import Logos from "$lib/components/Logos.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import Typewriter from "$lib/components/typewriter/Typewriter.svelte";
    import { onMount } from "svelte";
    import { m } from "$lib/paraglide/messages.js";
    import ByteSeparator from "$lib/components/ByteSeparator.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import { typewriterCursoredDeep } from "$lib/components/typewriter/typewriter";
    import type { Data } from "./tab";
    import type { TabProps } from "$lib/types/tab";

    let { data, navigator }: TabProps & { data: Data } = $props();
    let roll = $state(data.codes.roll());

    let showLogo = $state(false);

    onMount(() => {
        CustomElementUtils.define("logos-logo", Logos.element);
    });
</script>

<span>{m.left_odd_bobcat_build()}</span>

<div class="block h-1/12"></div>
<span>> </span>
<TypewriterCursored
    fn={typewriterCursoredDeep}
    time={100}
    onfinish={() => {
        showLogo = true;
    }}><ByteSeparator>{roll}</ByteSeparator></TypewriterCursored
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
        <Typewriter time={20}>
            <p class="mt-0 mb-0">{m.smart_such_fly_catch()}</p>
            <logos-logo></logos-logo>
            <br />
            <p class="mt-0 mb-0">{m.direct_major_felix_fulfill()}</p>
        </Typewriter>
    </div>
{/if}

<div class="block h-1/2"></div>

<TerminalChoice
    choices={[
        {
            text: "[手册 / MANUAL]",
            waitingTime: 1000,
            onclick: (e) => {
                //goto("/manual");
                navigator.goto("manual");
                //context.tab.set("manual");
            },
        },
        {
            text: "[初始化 / INITIALIZE]",
            waitingTime: 1000,
            onclick: (e) => {
                //goto("/offset/1");
            },
        },
    ]}
/>
