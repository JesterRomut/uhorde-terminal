<script module lang="ts">
    import Dummy from "$lib/components/Dummy.svelte";
    import type {
        StoryNavigator,
        StoryNavigatorForked,
        StoryNode,
    } from "./story";

    export { content, contentForked, contentAlt };
</script>

{#snippet content(navigator: StoryNavigator)}
    111
    <!-- {@render node.next?.content?.(node.next)} -->
    <Dummy
        onmount={() => {
            navigator.next();
        }}
    ></Dummy>
{/snippet}

{#snippet contentAlt(navigator: StoryNavigator)}
    222
    <!-- {@render node.next?.content?.(node.next)} -->
    <Dummy
        onmount={() => {
            navigator.next();
        }}
    ></Dummy>
{/snippet}

{#snippet contentForked(navigator: StoryNavigatorForked)}
    Forked
    <!-- {@render node.next?.content?.(node.next)} -->
    <Dummy
        onmount={() => {
            navigator.next("two");
        }}
    ></Dummy>
{/snippet}
