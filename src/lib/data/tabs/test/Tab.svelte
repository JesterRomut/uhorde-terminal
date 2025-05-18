<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import Story from "../../../components/Story.svelte";
    import { entry } from "./story";
    import type { StoryNode } from "../../../types/story";
    import type { Snippet } from "svelte";

    let stack: Writable<StoryNode[]> = writable([entry]);

    let wrappers = [content, wrapper1, wrapper1];
</script>

<Story bind:stack></Story>

{#snippet content()}
    111
{/snippet}

{#snippet wrapper1(children: Snippet)}
    222
    {@render children()}
{/snippet}
