<script>
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import Loader from "$lib/components/Loader.svelte";

    import { goto } from "$app/navigation";

    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";

    import * as intro from "./intro/Intro.svelte";

    // @ts-ignore
    import section0 from "./intro/section0.md";

    // @ts-ignore
    import section1 from "./intro/section1.md";

    import SectionedRender from "$lib/components/SectionedRender.svelte";
    import Dummy from "$lib/components/Dummy.svelte";
    //import { cardboard, terminal } from "../+layout.svelte";
    import { getContext, onMount } from "svelte";
    import { getCardboard } from "../+layout.svelte";

    const cardboard = getCardboard();
    cardboard.cards = [{ type: "character:uhrwerk" }];
    onMount(() => {
        console.log(cardboard);
        console.log(cardboard.cards);
    });
    //let finished = $state(false);
    let state = $state({ index: 0 });

    //const pages = [page0, page1];
    /**@type {import("$lib/components/SectionedRender.svelte").ShowConditionFn}*/
    const greaterEqual = (s, i) => s.index >= i;

    /**@type {import("$lib/components/SectionedRender.svelte").ShowConditionFn}*/
    const normalEqual = (s, i) => s.index == i;

    /**@type {import("$lib/components/SectionedRender.svelte").Section[]}*/
    const sections = [
        {
            content: section0,
            wrapper: contentWrapper,
            show: greaterEqual,
        },
        { wrapper: choiceContinue, show: normalEqual },
        { wrapper: space, show: greaterEqual },
        {
            content: section1,
            wrapper: contentWrapper,
            show: greaterEqual,
        },
    ];
</script>

{#snippet contentWrapper(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <TypewriterMoverCursored
        removeCursorWhenFinish={true}
        time={100}
        onfinish={() => {
            s.index++;
        }}
    >
        {@render c?.()}
    </TypewriterMoverCursored>
{/snippet}
{#snippet choiceContinue(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
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
                text: "[继续 / CONTINUE]",
                waitingTime: 1000,
                onclick: (e) => {
                    s.index++;
                },
            },
        ]}
    />
{/snippet}

{#snippet space(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <div class="h-10"></div>
    <Dummy
        onmount={() => {
            s.index++;
        }}
    ></Dummy>
{/snippet}

<Loader>
    <SectionedRender bind:state options={{}} {sections} />
</Loader>
