<script lang="ts">
    import { readable, writable, type Writable } from "svelte/store";
    import Story from "../../../components/story/Story.svelte";
    import { story } from "./story";
    import type { StoryNode } from "../../../components/story/types";
    import { onMount, type Snippet } from "svelte";
    import Typewriter from "$lib/components/typewriter/Typewriter.svelte";
    import { CustomElementUtils } from "$lib/classes/Utils";
    import Logos from "$lib/components/Logos.svelte";
    import Revelation from "./revelation.md";
    import {
        typewriterDeep,
        time,
        components,
        skippable,
    } from "$lib/components/typewriter";
    import TypewriterSkippable from "$lib/components/typewriter/TypewriterSkippable.svelte";
    import TypewriterBare from "$lib/components/typewriter/TypewriterBare.svelte";
    let stack: Writable<StoryNode[]> = writable([story.entry]);

    let shouldSkip = writable(false);
    onMount(() => {
        //CustomElementUtils.define("logos-logo", Logos.element);
    });
</script>

<TypewriterBare fn={typewriterDeep} plugins={[time(100)]}>
    <Revelation></Revelation>
</TypewriterBare>
<!-- 
<Typewriter>
    <Revelation></Revelation>

    <div data-uhorde-sv-component="Logos">111</div>
</Typewriter> -->
<!-- <Story bind:stack></Story> -->
<!-- <Revelation></Revelation> -->
<!-- <div
    tabindex="0"
    role="button"
    onkeydown={(event) => {
        $shouldSkip = true;
    }}
    onclick={() => {
        $shouldSkip = true;
    }}
>
    <Typewriter
        fn={typewriterDeep}
        plugins={[...skippable(shouldSkip, time(60)), components()]}
    >
        <Revelation></Revelation>

        <div data-uhorde-sv-component="Logos">111</div>
    </Typewriter>
</div> -->
