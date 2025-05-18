<script lang="ts">
    import type { Snippet } from "svelte";
    import {
        isSingleStoryNode,
        type MultipleStoryNodes,
        type StoryNavigator,
        type StoryNode,
    } from "./types";
    import { writable, type Writable } from "svelte/store";

    interface Props {
        stack: Writable<StoryNode[]>;
    }
    let { stack = $bindable(writable([])) }: Props = $props();

    //let stack: Writable<StoryNode[]> = writable([entry]);

    const navigator: (node: StoryNode) => StoryNavigator = (node) => {
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
    {@render node.content(navigator(node))}
{/snippet}

{#each $stack as thing}
    {@render wrapper(thing)}
{/each}
