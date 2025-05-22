<script lang="ts">
    import { goto } from "$app/navigation";
    import ByteSeparator from "$lib/components/ByteSeparator.svelte";
    import { onfinish, time, typewriterDeep } from "$lib/components/typewriter";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div
    class="left-1/2 top-1/2 transform-[translateX(-50%)_translateY(-50%)] absolute"
>
    >
    <TypewriterCursored
        fn={typewriterDeep}
        plugins={[
            time(60),
            onfinish(() => {
                goto("/?debug=on");
            }),
        ]}
        removeCursorWhenFinish={false}
        ><ByteSeparator>HERE BE DEBUGS.</ByteSeparator></TypewriterCursored
    >
</div>
