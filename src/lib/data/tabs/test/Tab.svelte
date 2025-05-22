<script lang="ts">
    import { writable, type Writable } from "svelte/store";
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
    } from "$lib/components/typewriter";
    let stack: Writable<StoryNode[]> = writable([story.entry]);

    onMount(() => {
        //CustomElementUtils.define("logos-logo", Logos.element);
    });
</script>

<!-- <Story bind:stack></Story> -->
<!-- <Revelation></Revelation> -->
<Typewriter fn={typewriterDeep} plugins={[time(60), components()]}>
    <!-- <Revelation></Revelation> -->

    <div data-uhorde-sv-component="Logos">111</div>
</Typewriter>
