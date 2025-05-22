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
    import type { Data } from "./tab";
    import type { TabProps } from "$lib/types/tab";
    import {
        onfinish,
        typewriterDeep,
        time,
        type DefaultAvailableComponentId,
        components,
    } from "$lib/components/typewriter";

    let { data, navigator }: TabProps & { data: Data } = $props();
    let roll = $state(data.codes.roll());

    let showLogo = $state(false);

    onMount(() => {
        // CustomElementUtils.define("logos-logo", Logos.element);
    });
</script>

<span>{m.left_odd_bobcat_build()}</span>

<div class="block h-1/12"></div>
<span>> </span>
<TypewriterCursored
    fn={typewriterDeep}
    plugins={[
        time(100),
        onfinish(() => {
            showLogo = true;
        }),
    ]}><ByteSeparator>{roll}</ByteSeparator></TypewriterCursored
>
<br />
{#if showLogo}
    <div class="inline-block absolute">
        <Typewriter fn={typewriterDeep} plugins={[time(40), components()]}>
            <p class="mt-0 mb-0">
                <ByteSeparator>{m.smart_such_fly_catch()}</ByteSeparator>
            </p>
            <!-- <logos-logo></logos-logo> -->
            <div
                data-uhorde-sv-component={"Logos" satisfies DefaultAvailableComponentId}
            ></div>
            <br />
            <p class="mt-0 mb-0">{m.direct_major_felix_fulfill()}</p>
        </Typewriter>
    </div>
{/if}

<div class="block h-1/2"></div>

<TerminalChoice
    choices={[
        {
            text: m.busy_awful_robin_buzz(),
            waitingTime: 1000,
            onclick: (e) => {
                //goto("/manual");
                navigator.goto("tutorial");
                //context.tab.set("manual");
            },
        },
        {
            text: m.each_cozy_parakeet_twirl(),
            waitingTime: 1000,
            onclick: (e) => {
                //goto("/offset/1");
            },
        },
    ]}
/>
