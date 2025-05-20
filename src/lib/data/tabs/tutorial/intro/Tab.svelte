<script lang="ts">
    import { CustomElementUtils } from "$lib/classes/Utils";
    import {
        CardActions,
        type CardAction,
        type CardObtainAction,
        type CardReplaceAction,
    } from "$lib/types/card";
    import {
        type StoryNavigator,
        type StoryNode,
        type StoryNodes,
    } from "$lib/types/story";
    import type { TabProps } from "$lib/types/tab";
    import { onMount, onDestroy, type Snippet } from "svelte";
    import type { Data } from "./tab";
    import CardCollectible from "$lib/components/cardboard/CardCollectibleElement.svelte";
    import { writable, type Writable } from "svelte/store";
    import Story from "$lib/components/Story.svelte";
    import Prose from "$lib/components/Prose.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";

    let { data, navigator: tabNavigator }: TabProps & { data: Data } = $props();
    let { cards, terminal } = tabNavigator.context;
    let { stories, tutor } = data;

    const nodes: StoryNode[] = stories.map((content) => ({
        content: contentWrapper,
        arguments: [content],
        next: undefined,
    }));

    // 建立链表关系（从第一个节点开始）
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }

    // 最终入口节点（根据实际需求调整）
    const storyEntryNode = nodes[0];

    const story: StoryNodes = {
        entry: {
            content: tutor,
            next: storyEntryNode,
        },
    };

    let body: Node | undefined;

    let storyNavigator: ((node: StoryNode) => StoryNavigator) | undefined =
        $state();

    //TODO 这个也要大改
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
        console.log(event);
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
                storyNavigator?.(currentStoryNode).next();
                break;
        }
    }

    onMount(() => {
        $cards = [];

        CustomElementUtils.define("card-collectible", CardCollectible.element);
        //CustomElementUtils.define("card-slot", CardSlot.element);

        body?.addEventListener("story-event", handleCardCollect);
    });
    onDestroy(() => {
        body?.removeEventListener("story-event", handleCardCollect);
    });

    let stack: Writable<StoryNode[]> = $state(writable([story.entry]));
</script>

<svelte:body bind:this={body} />

<Story bind:stack bind:navigator={storyNavigator}></Story>

{#snippet contentWrapper(
    navigator: StoryNavigator,
    arg: [Snippet<[StoryNavigator]>]
)}
    <Prose>
        <TypewriterCursored
            removeCursorWhenFinish={true}
            time={80}
            onfinish={() => {
                navigator.next();
            }}
        >
            {@render arg[0](navigator)}
        </TypewriterCursored>
    </Prose>
{/snippet}
