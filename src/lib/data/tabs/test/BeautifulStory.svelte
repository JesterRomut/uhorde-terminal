<script module lang="ts">
    import Dummy from "$lib/components/Dummy.svelte";
    import type { Snippet } from "svelte";
    import type {
        StoryNavigator,
        StoryNavigatorForked,
        StoryNode,
    } from "../../../types/story";

    export { content, contentForked, contentAlt, wrapper1 };
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

{#snippet wrapper1(
    navigator: StoryNavigator,
    children: Snippet<[StoryNavigator]>
)}
    Wrapper1
    <b> {@render children(navigator)}</b>
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
