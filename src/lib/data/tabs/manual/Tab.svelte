<script lang="ts">
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";

    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";

    import SectionedRender, {
        emptyWrapper,
        type Section,
        type SectionedRenderState,
        type ShowConditionFn,
    } from "$lib/components/SectionedRender.svelte";
    import Dummy from "$lib/components/Dummy.svelte";
    //import { cardboard, terminal } from "../+layout.svelte";
    import { onDestroy, onMount, type Snippet } from "svelte";
    import { CustomElementUtils } from "$lib/classes/Utils";
    import CardCollectible from "$lib/components/cardboard/CardCollectible.svelte";
    //import { cardboard } from "../../../../routes/+layout.svelte";
    //import { cardCollectibleElement } from "$lib/elements/card-collectible";

    // @ts-ignore
    import intro from "./intro.md";

    // @ts-ignore
    import tutor from "./tutor.md";

    //import { terminal } from "../../../../routes/(app)/+layout.svelte";
    import CardSlot from "$lib/components/cardboard/CardSlot.svelte";
    import Prose from "$lib/components/Prose.svelte";
    import type { AppState } from "$lib/data/types";
    import type { Data } from "./tab";
    import {
        CardActions,
        type CardAction,
        type CardObtainAction,
        type CardReplaceAction,
    } from "$lib/data/types/card";

    let { data, context: appState }: { data: Data; context: AppState } =
        $props();
    let { cards, terminal } = appState;
    let { stories } = data;

    function handleCardCollect(event: Event) {
        if (!(event instanceof CustomEvent)) return;

        /**@type {{detail: string}}*/
        let { detail } = event;
        if (!cardCollection.has(detail))
            throw new TypeError(`card not found, event.detail: ${detail}`);
        let card = cardCollection.get(detail);
        if (!card) throw new TypeError(`expect card, got ${card}`);

        //let cardboard = cardboardFn();
        switch (card.action) {
            case CardActions.OBTAIN:
                //cardboard.cards.push(/**@type {CardObtainAction}*/ (card).card);
                $cards = $cards.concat((card as CardObtainAction).card);
                break;
            case CardActions.REPLACE:
                let { card: match } = card as CardReplaceAction;

                // console.log(cardboard.cards.values().toArray());

                // console.log(
                //     cardboard.cards.findIndex((value) => {
                //         return value.type == match.from;
                //     })
                // );
                let index = $cards.findIndex((value) => {
                    return value.type == match.from;
                });
                if (index == -1) return;
                //$cards[index] = { type: match.dead || `${match.from}:dead` };
                $cards = $cards.toSpliced(index, 1, {
                    type: match.to,
                });
                //console.log(cardboard.cards);
                break;
        }
        cardCollectState.set(detail, true);

        switch (detail) {
            case "tutor":
                state.index++;
                break;
        }
    }
    // for (let i = 0; i < story.length; i++) {
    //     stories.push(importSync(`./story.sectioned/${story[i]}.md`).default);
    // }

    //const pages = [page0, page1];
    //const greaterEqual = (s, i) => s.index >= i && s.index < 2;

    const normalEqual: ShowConditionFn = (s, i) => s.index == i;

    const greaterEqual: ShowConditionFn = (s, i) => s.index >= i;

    const sections: Section[] = [
        {
            content: intro,
            wrapper: contentWrapper,
            show: (s, i) => greaterEqual(s, i) && s.index < 2,
        },
        { wrapper: choiceTutorial, show: normalEqual },
        {
            content: tutor,
            wrapper: emptyWrapper,
            show: greaterEqual,
        },
        {
            wrapper: cardSlot,
            show: greaterEqual,
        },
        { wrapper: space, show: greaterEqual },
    ];

    // /**@type {import("svelte").Snippet[]}*/
    // const stories = [];

    // const story = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // let storyPromise = (async () => {
    //     for (let i = 0; i < story.length; i++) {
    //         stories.push(
    //             (await import(`./story.sectioned/${story[i]}.md`)).default
    //         );
    //     }
    // })();
    sections.push(
        ...stories.slice(undefined, -1).map((snippet, index) => {
            return {
                content: snippet,
                wrapper: storyWrapper,
                show: greaterEqual,
            };
        }),
        { wrapper: choiceContinue, show: normalEqual },
        { wrapper: spaceKillCharacter, show: greaterEqual },
        {
            content: stories[stories.length - 1],
            wrapper: storyWrapper,
            show: greaterEqual,
        }
    );

    const cardCollection = new Map<string, CardAction>([
        [
            "tutor",
            {
                action: CardActions.OBTAIN,
                card: { type: "character:amen_gleph" },
            },
        ],
        [
            "tutor_kill",
            {
                action: CardActions.REPLACE,
                card: {
                    from: "character:amen_gleph",
                    to: "character:amen_gleph:dead",
                },
            },
        ],
    ]);
    const cardCollectState = new Map([
        ["tutor", false],
        ["tutor_kill", false],
    ]);

    let body: Node | undefined;

    $cards = []; //{ type: "character:amen_gleph:dead" }
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
</script>

<svelte:body bind:this={body} />

{#snippet contentWrapper(
    s: SectionedRenderState,
    i: number,
    c: Snippet | undefined
)}
    <!-- <article
        class="prose prose-sm prose-console max-w-none prose-hr:border-t-[var(--tw-prose-body)] prose-hr:border-t-[2px] prose-hr:mt-[0.6em] prose-hr:mb-[2em] prose-headings:mt-[0.2em]"
    > -->
    <Prose>
        <TypewriterCursored
            removeCursorWhenFinish={true}
            time={80}
            onfinish={() => {
                s.index++;
            }}
        >
            {@render c?.()}
        </TypewriterCursored>
    </Prose>
    <!-- </article> -->
{/snippet}

{#snippet storyWrapper(
    s: SectionedRenderState,
    i: number,
    c: Snippet | undefined
)}
    <Prose>
        <TypewriterCursored
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
        </TypewriterCursored>
    </Prose>
{/snippet}
{#snippet choiceTutorial(
    s: SectionedRenderState,
    i: number,
    c: Snippet | undefined
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
    s: SectionedRenderState,
    i: number,
    c: Snippet | undefined
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
{#snippet cardSlot(s: SectionedRenderState, i: number, c: Snippet | undefined)}
    <CardSlot
        title="观察"
        oninsert={(card) => {
            s.index++;
            return { valid: true };
        }}
    ></CardSlot>
{/snippet}

{#snippet space(s: SectionedRenderState, i: number, c: Snippet | undefined)}
    <div class="h-10"></div>
    <Dummy
        onmount={() => {
            s.index++;
        }}
    ></Dummy>
{/snippet}

{#snippet spaceKillCharacter(
    s: SectionedRenderState,
    i: number,
    c: Snippet | undefined
)}
    <div class="h-10"></div>
    <Dummy
        onmount={() => {
            s.index++;
            const customEvent = new CustomEvent("card-collected", {
                detail: "tutor_kill",
                bubbles: true,
            });
            body?.dispatchEvent(customEvent);
        }}
    ></Dummy>
{/snippet}

<SectionedRender bind:state options={{}} {sections} />
