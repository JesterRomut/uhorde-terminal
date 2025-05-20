<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import Story from "../../../components/Story.svelte";
    import { story } from "./story";
    import type { StoryNode } from "../../../types/story";
    import { onMount, type Snippet } from "svelte";
    import Typewriter from "$lib/components/typewriter/Typewriter.svelte";
    import { CustomElementUtils } from "$lib/classes/Utils";
    import CardCollectible from "$lib/components/cardboard/CardCollectibleElement.svelte";
    import Logos from "$lib/components/Logos.svelte";
    import TypewriterDeep from "$lib/components/typewriter/TypewriterDeep.svelte";

    let stack: Writable<StoryNode[]> = writable([story.entry]);

    onMount(() => {
        CustomElementUtils.define("logos-logo", Logos.element);
    });
</script>

<!-- <Revelation></Revelation> -->
<Story bind:stack></Story>
