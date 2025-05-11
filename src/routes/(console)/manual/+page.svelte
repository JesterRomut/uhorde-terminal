<script>
    /**@typedef {import("$lib/components/SectionedRender.svelte").SectionedRenderState} state*/

    /**
     * @readonly
     * @enum {string}
     */
    const CardActions = {
        OBTAIN: "obtain",
        KILL: "kill",
    };

    /**@typedef {object} CardObtainAction
     * @property {import("$lib/components/cardboard/Card.svelte").CardInstance} card
     * @property {"obtain"} action
     */
    /**@typedef {object} CardKillAction
     * @property {object} card
     * @property {string} card.from
     * @property {string} [card.dead]
     * @property {"replace"} action
     */

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
    import tutor from "./tutor.md";

    // @ts-ignore
    import section0 from "./story.sectioned/0.md";

    import { terminal } from "../+layout.svelte";
    import CardSlot from "$lib/components/cardboard/CardSlot.svelte";
    import LoadingText from "$lib/components/LoadingText.svelte";

    /**@param {Event} event*/
    function handleCardCollect(event) {
        if (!(event instanceof CustomEvent)) return;

        /**@type {{detail: string}}*/
        let { detail } = event;
        if (!cardCollection.has(detail))
            throw new TypeError(`card not found, event.detail: ${detail}`);
        let card = cardCollection.get(detail);
        if (!card) throw new TypeError(`expect card, got ${card}`);

        switch (card.action) {
            case CardActions.OBTAIN:
                cardboard.cards.push(/**@type {CardObtainAction}*/ (card).card);
                break;
            case CardActions.KILL:
                let { card: match } = /**@type {CardKillAction}*/ (card);

                console.log(cardboard.cards.values().toArray());

                console.log(
                    cardboard.cards.findIndex((value) => {
                        return value.type == match.from;
                    })
                );
                let index = cardboard.cards.findIndex((value) => {
                    return value.type == match.from;
                });
                if (index == -1) return;
                cardboard.cards[index].type =
                    match.dead || `${match.from}:dead`;
                console.log(cardboard.cards);
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

    /**@type {import("svelte").Snippet[]}*/
    const stories = [];

    const story = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    let storyPromise = (async () => {
        for (let i = 0; i < story.length; i++) {
            stories.push(
                (await import(`./story.sectioned/${story[i]}.md`)).default
            );
        }
    })();
    storyPromise.then(() => {
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
    });

    const cardCollection = new Map([
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
                action: CardActions.KILL,
                card: {
                    from: "character:amen_gleph",
                    //replace: { type: "character:amen_gleph:dead" },
                },
            },
        ],
    ]);
    const cardCollectState = new Map([
        ["tutor", false],
        ["tutor_kill", false],
    ]);

    /**
     * @type {Node | undefined}
     */
    let body;

    cardboard.cards = []; //{ type: "character:amen_gleph:dead" }
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

{#snippet storyWrapper(
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

{#snippet spaceKillCharacter(
    /**@type {state}*/ s,
    /**@type {number}*/ i,
    /**@type {import("svelte").Snippet | undefined}*/ c
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
<Loader>
    {#await storyPromise}
        <LoadingText></LoadingText>
    {:then value}
        <SectionedRender bind:state options={{}} {sections} />
    {/await}
</Loader>
