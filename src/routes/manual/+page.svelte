<script>
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import Loader from "$lib/components/Loader.svelte";

    import { goto } from "$app/navigation";

    // @ts-ignore
    import everything from "$lib/documents/manual.md";
    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";
    import { typewriterMoverCursoredDeep } from "$lib/components/typewriter/typewriterMover";

    //let page = $state(0);
    let finished = $state(false);

    // import Logos from "$lib/components/Logos.svelte";
    // import { onMount } from "svelte";
    // import { CustomElementUtil } from "$lib/classes/Utils";
    // onMount(() => {
    //     CustomElementUtil.define("logos-logo", Logos.element);
    // });
</script>

<Loader>
    <TypewriterMoverCursored
        removeCursorWhenFinish={false}
        time={100}
        onfinish={() => {
            new Promise((fulfil) => {
                setTimeout(fulfil, 500);
            }).then(() => {
                finished = true;
            });
        }}
    >
        {@render everything()}
    </TypewriterMoverCursored>
    {#if finished}
        <TerminalChoice
            choices={[
                // {
                //     text: "[下一页 / NEXT PAGE]",
                //     waitingTime: 1000,
                //     onclick: (e) => {
                //         goto("/");
                //     },
                // },
                {
                    text: "[返回 / RETURN]",
                    waitingTime: 1000,
                    onclick: (e) => {
                        goto("/");
                    },
                },
            ]}
        />
    {/if}
</Loader>
