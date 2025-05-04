<script>
    import { goto } from "$app/navigation";
    import Loader from "$lib/components/Loader.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import { onMount } from "svelte";

    let { data } = $props();

    let isLoading = $state(true);
    onMount(() => {
        isLoading = false;
    });
    //console.log(data);
</script>

<svelte:head>
    <!-- <link rel="preload" href={data.chargeBlade.img.src} as="image" /> -->
</svelte:head>

<Loader>
    <span>乌鸦为什么像写字台？</span>

    <br />

    <span>> 因为我喜欢你，没有理由。</span>

    <br />

    <span>权限验证通过。</span>

    <div class="block h-1/2"></div>

    <br />

    <TerminalChoice
        choices={[
            {
                text: "[手册 / MANUAL]",
                href: "/manual",
            },
            { text: "[开始 / START SIMULATION]", href: "/offset/1" },
        ]}
    />
</Loader>
