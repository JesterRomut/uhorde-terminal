<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import Story from "$lib/components/Story.svelte";
    import type {
        StoryNavigator,
        StoryNavigatorSingle,
        StoryNode,
    } from "../../../types/story";
    import Dummy from "$lib/components/Dummy.svelte";

    // @ts-ignore
    import intro from "./intro.md";

    // @ts-ignore
    import tutor from "./tutor.md";
    import Prose from "$lib/components/Prose.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import { CustomElementUtils } from "$lib/classes/Utils";
    import CardCollectible from "$lib/components/cardboard/CardCollectible.svelte";
    import { onDestroy, onMount } from "svelte";
    import {
        CardActions,
        type CardAction,
        type CardObtainAction,
        type CardReplaceAction,
    } from "$lib/types/card";
    import type { Data } from "./tab";
    import type { AppState } from "$lib/types";
    import Error from "../../../../routes/+error.svelte";

    let { data, context: appState }: { data: Data; context: AppState } =
        $props();
    let { cards, terminal } = appState;
    let { stories } = data;

    const nodes: StoryNode[] = stories.map((content) => ({
        content: content,
        next: undefined,
    }));

    // 建立链表关系（从第一个节点开始）
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }

    // 最终入口节点（根据实际需求调整）
    const storyEntryNode = nodes[0];
    console.log(nodes);

    // const storyEntryNode: StoryNode = {
    //     content: introWrapped,
    //     next: undefined,
    // };

    const tutorNode: StoryNode = {
        content: tutor,
        next: storyEntryNode,
    };
    const introChoiceBeginStory: StoryNode = {
        content: choiceTutorial,
        next: tutorNode,
    };

    const entryNode: StoryNode = {
        content: introWrapped,
        next: introChoiceBeginStory,
    };

    let stack: Writable<StoryNode[]> = $state(writable([entryNode]));
    let navigator: ((node: StoryNode) => StoryNavigator) | undefined = $state();

    let body: Node | undefined;

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

    function handleCardCollect(event: Event) {
        if (!(event instanceof CustomEvent)) return;

        let { detail }: { detail: string } = event;
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
                let currentStoryNode = $stack.at(-1);
                if (!currentStoryNode)
                    throw new TypeError(
                        `expect StoryNode, got ${currentStoryNode}`
                    );
                if (!navigator)
                    throw new TypeError(`expect navigator, got ${navigator}`);
                navigator(currentStoryNode).next();
                break;
        }
    }

    onMount(() => {
        $cards = [];

        CustomElementUtils.define("card-collectible", CardCollectible.element);
        //CustomElementUtils.define("card-slot", CardSlot.element);

        body?.addEventListener("card-collected", handleCardCollect);
    });
    onDestroy(() => {
        body?.removeEventListener("card-collected", handleCardCollect);
    });
</script>

<svelte:body bind:this={body} />

{#snippet introWrapped(navigator: StoryNavigatorSingle)}
    <Prose>
        <TypewriterCursored
            removeCursorWhenFinish={true}
            time={80}
            onfinish={() => {
                navigator.next();
            }}
        >
            {@render intro()}
        </TypewriterCursored>
    </Prose>
{/snippet}

{#snippet choiceTutorial(navigator: StoryNavigatorSingle)}
    <TerminalChoice
        choices={[
            {
                text: "[教程 / TUTORIAL]",
                waitingTime: 1000,
                onclick: (e) => {
                    navigator.clear();
                    navigator.next();
                },
            },
        ]}
    />
{/snippet}

<Story bind:stack bind:navigator></Story>
