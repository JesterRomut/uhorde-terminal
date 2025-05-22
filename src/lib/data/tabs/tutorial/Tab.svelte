<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import Story from "$lib/components/story/Story.svelte";
    import type {
        AnyStoryNode,
        StoryNavigator,
        StoryNavigatorSingle,
        StoryNode,
    } from "../../../components/story/types";

    import intro from "./intro.md";

    //import tutor from "./tutor.md";
    import Prose from "$lib/components/Prose.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import type { TabProps } from "$lib/types/tab";
    import { onMount } from "svelte";
    import { tabRegistry } from "..";
    import { m } from "$lib/paraglide/messages";
    import { onfinish, time } from "$lib/components/typewriter";

    let { navigator: tabNavigator }: TabProps = $props();
    //let { cards, terminal } = tabNavigator.context;

    const story: Record<string, AnyStoryNode> = {
        entry: {
            content: introWrapped,
            next: () => story.choice,
        },
        choice: {
            content: choiceTutorial,
        },
    };

    // const introChoiceBeginStory: StoryNode = {
    //     content: choiceTutorial,
    // };

    // const entryNode: StoryNode = {
    //     content: introWrapped,
    //     next: introChoiceBeginStory,
    // };

    let stack: Writable<StoryNode[]> = $state(writable([story.entry]));

    onMount(() => {
        tabRegistry.get("tutorial/intro").load();
    });
</script>

{#snippet introWrapped(navigator: StoryNavigatorSingle)}
    <Prose>
        <TypewriterCursored
            removeCursorWhenFinish={true}
            plugins={[
                time(80),
                onfinish(() => {
                    navigator.next();
                }),
            ]}
        >
            {@render intro()}
        </TypewriterCursored>
    </Prose>
{/snippet}

{#snippet choiceTutorial(navigator: StoryNavigatorSingle)}
    <TerminalChoice
        choices={[
            {
                text: m.weak_ornate_lemming_clip(),
                waitingTime: 1000,
                onclick: (e) => {
                    tabNavigator.goto("tutorial/intro");
                },
            },
        ]}
    />
{/snippet}

<Story bind:stack></Story>
