<script>
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import Loader from "$lib/components/Loader.svelte";

    import { goto } from "$app/navigation";

    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";

    import SectionedRender, {
        emptyWrapper,
    } from "$lib/components/SectionedRender.svelte";
    import Dummy from "$lib/components/Dummy.svelte";
    //import { cardboard, terminal } from "../+layout.svelte";
    import { getContext, onDestroy, onMount } from "svelte";
    import { CustomElementUtils } from "$lib/classes/Utils";
    import CardCollectible from "$lib/components/cardboard/CardCollectible.svelte";
    import { cardboard } from "../../+layout.svelte";
    //import { cardCollectibleElement } from "$lib/elements/card-collectible";

    // @ts-ignore
    import intro from "./intro.md";

    // @ts-ignore
    import tutor0 from "./tutor0.md";

    // @ts-ignore
    import tutor1 from "./tutor1.md";

    // @ts-ignore
    import section1 from "./intro/section1.md";

    import { terminal } from "../+layout.svelte";
    import CardSlot from "$lib/components/cardboard/CardSlot.svelte";

    /**@param {Event} event*/
    function handleCardCollect(event) {
        if (!(event instanceof CustomEvent)) return;

        /**@type {{detail: string}}*/
        let { detail } = event;
        if (!cardCollection.has(detail))
            throw new TypeError(`card not found, event.detail: ${detail}`);
        let card = cardCollection.get(detail);
        if (!card) throw new TypeError(`expect card, got ${card}`);
        cardboard.cards.push(card);
        cardCollectState.set(detail, true);

        switch (detail) {
            case "tutor":
                state.index++;
                break;
        }
    }

    /**
     * @type {Node | undefined}
     */
    let body;

    cardboard.cards = [];
    onMount(() => {
        CustomElementUtils.define("card-collectible", CardCollectible.element);
        //CustomElementUtils.define("card-slot", CardSlot.element);

        body?.addEventListener("card-collected", handleCardCollect);
    });
    onDestroy(() => {
        body?.removeEventListener("card-collected", handleCardCollect);
    });
    //let finished = $state(false);
    let state = $state({ index: 0 });

    //const pages = [page0, page1];
    /**@type {import("$lib/components/SectionedRender.svelte").ShowConditionFn}*/
    //const greaterEqual = (s, i) => s.index >= i && s.index < 2;

    /**@type {import("$lib/components/SectionedRender.svelte").ShowConditionFn}*/
    const normalEqual = (s, i) => s.index == i;

    /**@type {import("$lib/components/SectionedRender.svelte").ShowConditionFn}*/
    const greaterEqual = (s, i) => s.index >= i;

    /**@type {import("$lib/components/SectionedRender.svelte").Section[]}*/
    const sections = [
        {
            content: intro,
            wrapper: contentWrapper,
            show: (s, i) => greaterEqual(s, i) && s.index < 2,
        },
        { wrapper: choiceTutorial, show: normalEqual },
        {
            content: tutor0,
            wrapper: emptyWrapper,
            show: greaterEqual,
        },
        {
            wrapper: cardSlot,
            show: greaterEqual,
        },
        { wrapper: space, show: greaterEqual },
        {
            content: section1,
            wrapper: contentWrapperSlow,
            show: greaterEqual,
        },
    ];

    const cardCollection = new Map([
        ["tutor", { type: "character:amen_gleph" }],
    ]);
    const cardCollectState = new Map([["tutor", false]]);
</script>

<svelte:body bind:this={body} />

{#snippet contentWrapper(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <TypewriterMoverCursored
        removeCursorWhenFinish={true}
        time={80}
        onfinish={() => {
            s.index++;
        }}
    >
        {@render c?.()}
    </TypewriterMoverCursored>
{/snippet}

{#snippet contentWrapperSlow(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <TypewriterMoverCursored
        removeCursorWhenFinish={true}
        time={600}
        onfinish={() => {
            new Promise((fulfil) => {
                setTimeout(fulfil, 300);
            }).then(() => {
                s.index++;
            });
        }}
        onappend={[
            (/**@type {Node}*/ node) => {
                let terminalElement = terminal();
                if (!terminalElement) return;
                terminalElement.scrollTop = terminalElement.scrollHeight;
            },
        ]}
    >
        {@render c?.()}
    </TypewriterMoverCursored>
{/snippet}
{#snippet choiceTutorial(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <TerminalChoice
        choices={[
            {
                text: "[教程 / TUTORIAL]",
                waitingTime: 1000,
                onclick: (e) => {
                    s.index++;
                },
            },
        ]}
    />
{/snippet}
{#snippet choiceContinue(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <TerminalChoice
        choices={[
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
{#snippet cardSlot(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
)}
    <CardSlot
        title="观察"
        oninsert={(card) => {
            s.index++;
            return { valid: true };
        }}
    ></CardSlot>
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
