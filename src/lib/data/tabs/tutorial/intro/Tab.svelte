<script lang="ts">
    import { CustomElementUtils } from "$lib/classes/Utils";
    import {
        type AnyStoryNode,
        type StoryNavigator,
        type StoryNavigatorForked,
        type StoryNavigatorSingle,
        type StoryNode,
        type StoryNodes,
    } from "$lib/components/story/types";
    import type { TabProps } from "$lib/types/tab";
    import { onMount, onDestroy, type Snippet } from "svelte";
    import type { Data } from "./tab";
    import { writable, type Writable } from "svelte/store";
    import Story from "$lib/components/story/Story.svelte";
    import Prose from "$lib/components/Prose.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import VerbObjectSlots from "$lib/components/cardslot/VerbNounSlots.svelte";
    import Registry from "$lib/classes/Registry";
    import type { CardInstance } from "$lib/components/cardboard/types";
    import { on } from "svelte/events";
    import { receiveStoryEvent, sendStoryEvent } from "$lib/components/story";
    import ByteSeparator from "$lib/components/ByteSeparator.svelte";
    import { onfinish, time, typewriterDeep } from "$lib/components/typewriter";
    import { isNil } from "lodash-es";
    import tutor0 from "./content.sectioned/tutor0.md";
    import tutor1 from "./content.sectioned/tutor1.md";
    import end from "./content.sectioned/end.md";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";

    let { data, navigator: tabNavigator }: TabProps & { data: Data } = $props();
    let { cards, terminal } = tabNavigator.context;
    let { stories } = data.content;

    const nodes: StoryNode[] = stories.map((content) => ({
        content: contentWrapper,
        arguments: [content],
        next: undefined,
    }));

    const story = {
        entry: {
            content: contentWrapperNoTypewriter,
            arguments: [tutor0],
            next: () => story.cardSlot,
        },
        cardSlot: {
            content: tutorCardSlot,
            next: { tutor: () => story.slotTutor, story: () => storyEntryNode },
        },
        slotTutor: {
            content: tutor1Wrapped,
        },
        end: {
            content: contentWrapper,
            arguments: [end],
        },
    };
    story satisfies StoryNodes;

    // 建立链表关系（从第一个节点开始）
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }

    // 最终入口节点（根据实际需求调整）
    const storyEntryNode = nodes[0];
    nodes[nodes.length - 1].next = {
        content: choiceContinue,
        next: story.end,
    };

    let body: Element | undefined;

    let storyNavigator: ((node: StoryNode) => StoryNavigator) | undefined =
        $state();

    function giveCard(card: CardInstance) {
        $cards = $cards.concat(card);
    }

    interface StoryEvent {
        action: () => void;
        completed: boolean;
    }

    const storyEvents = Registry.create()
        .register("tutor", {
            action: () => {
                giveCard(
                    storyEvents.get("tutorKill").completed
                        ? { type: "character:amen_gleph:dead" }
                        : { type: "character:amen_gleph" }
                );
                let currentStoryNode = $stack.at(-1);
                if (!currentStoryNode)
                    throw new TypeError(
                        `expect StoryNode, got ${currentStoryNode}`
                    );
                // if (!navigator)
                //     throw new TypeError(`expect navigator, got ${navigator}`);
                storyNavigator?.(currentStoryNode).next();
            },
            completed: false as boolean,
        } satisfies StoryEvent)
        .register("amenInserted", {
            action() {
                let currentStoryNode = $stack.at(-1);
                if (!currentStoryNode)
                    throw new TypeError(
                        `expect StoryNode, got ${currentStoryNode}`
                    );
                storyNavigator?.(currentStoryNode).next("tutor");
            },
            completed: false as boolean,
        } satisfies StoryEvent)
        .register("observe", {
            action() {
                giveCard({ type: "action:observe" });
            },
            completed: false as boolean,
        } satisfies StoryEvent)
        .register("tutorKill", {
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
            completed: false as boolean,
        } satisfies StoryEvent);
    function handleStoryEvent(event: Event) {
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

    type StoryEventId = keyof typeof storyEvents.registry;

    let removeStoryEventListener: () => void;

    onMount(() => {
        $cards = [];

        removeStoryEventListener = receiveStoryEvent(body, handleStoryEvent);
    });
    onDestroy(() => {
        removeStoryEventListener();
    });

    let stack: Writable<StoryNode[]> = $state(writable([story.entry]));
</script>

<svelte:body bind:this={body} />

<Story bind:stack bind:navigator={storyNavigator}></Story>

{#snippet contentWrapperNoTypewriter(
    navigator: StoryNavigator,
    arg: [Snippet<[StoryNavigator]>]
)}
    <Prose>{@render arg[0](navigator)}</Prose>
{/snippet}

{#snippet contentWrapper(
    navigator: StoryNavigator,
    arg: [Snippet<[StoryNavigator]>]
)}
    <Prose>
        <TypewriterCursored
            removeCursorWhenFinish={true}
            plugins={[
                time(100),
                onfinish(() => {
                    navigator.next();
                }),
            ]}
        >
            <!-- onfinish={() => {
            navigator.next();
        }} -->
            {@render arg[0](navigator)}
        </TypewriterCursored>
    </Prose>
{/snippet}

{#snippet tutor1Wrapped(navigator: StoryNavigator)}
    <Prose>
        <TypewriterCursored
            removeCursorWhenFinish={true}
            fn={typewriterDeep}
            plugins={[time(40)]}
        >
            <ByteSeparator>{@render tutor1()}</ByteSeparator>
        </TypewriterCursored>
    </Prose>
{/snippet}

{#snippet choiceContinue(navigator: StoryNavigatorSingle)}
    <TerminalChoice
        choices={[
            {
                text: `[继续 / CONTINUE]`,
                waitingTime: 1000,
                onclick: (e) => {
                    navigator.keep(undefined, -1);
                    navigator.next();
                },
            },
        ]}
    />
{/snippet}

{#snippet tutorCardSlot(navigator: StoryNavigatorForked<"story" | "tutor">)}
    <div class="h-10"></div>
    <VerbObjectSlots
        consumeNoun={true}
        validVerb={(state) => state.draggedItem.type === "action:observe"}
        validNoun={(state) => state.draggedItem.type === "character:amen_gleph"}
        cardboard={cards}
        afterdrop={(_, group) => {
            if (group != "noun") return;
            sendStoryEvent<StoryEventId>(body, "amenInserted");
            //navigator.next();
        }}
        onsubmit={(verb, noun) => {
            if (!verb) return false;
            if (!noun) return false;
            navigator.next("story");
            return true;
        }}
        cansubmit={(verb, noun) => {
            return !(isNil(verb) || isNil(noun));
        }}
    />
{/snippet}
