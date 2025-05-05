<script>
    import { goto } from "$app/navigation";
    import Loader from "$lib/components/Loader.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import Typewriter from "$lib/components/typewriter/Typewriter.svelte";
    import { onDestroy, onMount } from "svelte";
    import { slide } from "svelte/transition";

    let { data } = $props();

    //let code = data.codes.roll();

    let roll = $state(data.codes.roll());

    /**
     * @type {?number}
     */
    let rollerId;
    onMount(() => {
        rollerId = setInterval(() => {
            let result = data.codes.roll();
            roll = result ? result : "";
        }, 2000);
    });

    onDestroy(() => {
        if (rollerId) clearInterval(rollerId);
    });
    //console.log(data);
</script>

<svelte:head>
    <!-- <link rel="preload" href={data.chargeBlade.img.src} as="image" /> -->
</svelte:head>

<Loader>
    <span>乌鸦为什么像写字台？</span>

    <br />

    {#key roll}
        <!-- <Typewriter time={100}>> {roll}</Typewriter> -->
        <span class="block" transition:slide>> {roll}</span>
    {/key}

    <br />

    <Typewriter time={100}>权限验证通过。</Typewriter>

    <div class="block h-1/2"></div>

    <br />

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
                text: "[开始 / START SIMULATION]",
                waitingTime: 1000,
                onclick: (e) => {
                    goto("/offset/1");
                },
            },
        ]}
    />
</Loader>
