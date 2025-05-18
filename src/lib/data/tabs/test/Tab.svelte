<script lang="ts">
    import { writable, type Writable } from "svelte/store";
    import Story from "./Story.svelte";
    import { entry } from "./story";
    import type { StoryNode } from "./types";

    let stack: Writable<StoryNode[]> = writable([entry]);
</script>

<Story bind:stack></Story>
