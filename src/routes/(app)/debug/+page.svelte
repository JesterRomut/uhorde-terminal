<script lang="ts">
    import { goto } from "$app/navigation";
    import ByteSeparator from "$lib/components/ByteSeparator.svelte";
    import { typewriterCursoredDeep } from "$lib/components/typewriter";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div
    class="left-1/2 top-1/2 transform-[translateX(-50%)_translateY(-50%)] absolute"
>
    >
    <TypewriterCursored
        fn={typewriterCursoredDeep}
        time={60}
        removeCursorWhenFinish={false}
        onfinish={() => {
            //sessionStorage.setItem("debug", "on");
            goto("/?debug=on");
        }}><ByteSeparator>HERE BE DEBUGS.</ByteSeparator></TypewriterCursored
    >
</div>
