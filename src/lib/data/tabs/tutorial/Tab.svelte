<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import Story from "$lib/components/Story.svelte";
    import type {
        StoryNavigator,
        StoryNavigatorSingle,
        StoryNode,
    } from "../../../types/story";

    import intro from "./intro.md";

    //import tutor from "./tutor.md";
    import Prose from "$lib/components/Prose.svelte";
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterCursored from "$lib/components/typewriter/TypewriterCursored.svelte";
    import type { TabProps } from "$lib/types/tab";

    let { navigator: tabNavigator }: TabProps = $props();
    //let { cards, terminal } = tabNavigator.context;

    // const storyEntryNode: StoryNode = {
    //     content: introWrapped,
    //     next: undefined,
    // };

    const introChoiceBeginStory: StoryNode = {
        content: choiceTutorial,
    };

    const entryNode: StoryNode = {
        content: introWrapped,
        next: introChoiceBeginStory,
    };

    let stack: Writable<StoryNode[]> = $state(writable([entryNode]));
</script>

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
                    tabNavigator.goto("tutorial/intro");
                },
            },
        ]}
    />
{/snippet}

<Story bind:stack></Story>
