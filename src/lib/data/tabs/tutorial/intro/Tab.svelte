<script lang="ts">
    import { CustomElementUtils } from "$lib/classes/Utils";
    import {
        type StoryNavigator,
        type StoryNode,
        type StoryNodes,
    } from "$lib/components/story/types";
    import type { TabProps } from "$lib/types/tab";
    import { onMount, onDestroy, type Snippet } from "svelte";
    import type { Data } from "./tab";
    import CardCollectible from "$lib/components/cardboard/CardCollectibleElement.svelte";
    import { writable, type Writable } from "svelte/store";
    import Story from "$lib/components/story/Story.svelte";
    import Prose from "$lib/components/Prose.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import VerbObjectSlots from "$lib/components/cardslot/VerbNounSlots.svelte";
    import Registry from "$lib/classes/Registry";
    import type { CardInstance } from "$lib/components/cardboard/types";
    import { globalState } from "$lib/actions/dragdrop/store.svelte.js";

    let { data, navigator: tabNavigator }: TabProps & { data: Data } = $props();
    let { cards, terminal } = tabNavigator.context;
    let { stories, tutor0, tutor1 } = data.content;

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
            content: tutor0,
            next: () => story.got_card,
        },
        got_card: {
            content: tutorCardSlot,
            next: undefined,
        },
    };

    let body: Node | undefined;

    let storyNavigator: ((node: StoryNode) => StoryNavigator) | undefined =
        $state();

    function giveCard(card: CardInstance) {
        $cards = $cards.concat(card);
    }

    const storyEvents = Registry.object()
        .register("tutor", {
            action: () => {
                giveCard(
                    storyEvents.get("tutor_kill").completed
                        ? { type: "character:amen_gleph:dead" }
                        : { type: "character:amen_gleph" }
                );

                // new Promise((fulfill) => {
                //     setTimeout(fulfill, 200);
                // }).then(() => {
                //     giveCard({ type: "action:observe" });
                // });

                let currentStoryNode = $stack.at(-1);
                if (!currentStoryNode)
                    throw new TypeError(
                        `expect StoryNode, got ${currentStoryNode}`
                    );
                if (!navigator)
                    throw new TypeError(`expect navigator, got ${navigator}`);
                storyNavigator?.(currentStoryNode).next();
            },
            completed: false,
        })
        .register("tutor_kill", {
            action: () => {
                $cards = $cards.concat({ type: "character:amen_gleph" });
                let index = $cards.findIndex((value) => {
                    return value.type == "character:amen_gleph";
                });
                if (index == -1) return;
                //$cards[index] = { type: match.dead || `${match.from}:dead` };
                $cards = $cards.toSpliced(index, 1, {
                    type: "character:amen_gleph:dead",
                });
            },
            completed: false,
        });
    function handleCardCollect(event: Event) {
        if (!(event instanceof CustomEvent)) return;
        let { detail }: { detail: string } = event;
        let storyEvent = storyEvents.get(
            detail as keyof typeof storyEvents.registry
        );
        if (!storyEvent)
            throw new TypeError(`event not found, event.detail: ${detail}`);
        if (storyEvent.completed) return;
        storyEvent.action();
        storyEvent.completed = true;
    }

    onMount(() => {
        $cards = [];

        // CustomElementUtils.define("card-collectible", CardCollectible.element);
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

{#snippet tutorCardSlot(navigator: StoryNavigator)}
    <VerbObjectSlots
        consumeNoun={true}
        validVerb={(state) => state.draggedItem.type === "action:observe"}
        validNoun={(state) => {
            console.log(globalState.invalidDrop);
            return true;
        }}
    />
{/snippet}
