<script lang="ts">
    import {
        isSingleStoryNode,
        isWrappedStoryNode,
        type MultipleStoryNodes,
        type StoryNavigator,
        type StoryNode,
    } from "../types/story";
    import { writable, type Writable } from "svelte/store";

    interface Props {
        stack: Writable<StoryNode[]>;
        navigator?: (node: StoryNode) => StoryNavigator;
    }
    let { stack = $bindable(writable([])), navigator = $bindable() }: Props =
        $props();

    //let stack: Writable<StoryNode[]> = writable([entry]);

    navigator = (node) => {
        const next = () => {
            if (!node.next) {
                return () => {};
            }
            if (!isSingleStoryNode(node.next)) {
                return (to: string) => {
                    $stack = $stack.concat(
                        (node.next as MultipleStoryNodes)[to]
                    );
                };
            }
            return () => {
                $stack = $stack.concat(node.next as StoryNode);
            };
        };

        return {
            stack: stack,
            next: next(),
            keep: (start?: number, end?: number) => {
                $stack = $stack.slice(start, end);
            },
            clear: () => {
                $stack = [];
            },
        } as StoryNavigator;
    };
</script>

{#snippet wrapper(node: StoryNode)}
    {#if navigator}
        {#if isWrappedStoryNode(node)}
            {@render node.content(navigator(node), node.children)}
        {:else}
            {@render node.content(navigator(node))}
        {/if}
    {:else}
        Expect navigatorFn, got {navigator}
    {/if}
{/snippet}

{#each $stack as thing}
    {@debug thing}
    {@render wrapper(thing)}
{/each}
