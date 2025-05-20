<script lang="ts">
    import {
        isArgumentedStoryNode,
        type StoryNavigator,
        type StoryNode,
        isSingleNextStoryNode,
    } from "./types";
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
            if (isSingleNextStoryNode(node.next)) {
                let nextNodeTyped = node.next;
                return () => {
                    let nextNode = nextNodeTyped;
                    if (typeof nextNode === "function") nextNode = nextNode();
                    //if (!nextNode) throw new TypeError();
                    $stack = $stack.concat(nextNode);
                    //console.log(nextNode);
                };
            }
            let nextNodeTyped = node.next;
            return (to: string) => {
                let nextNode = nextNodeTyped[to];
                if (typeof nextNode === "function") nextNode = nextNode();
                $stack = $stack.concat(nextNode);
                //console.log(nextNode);
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
        {#if isArgumentedStoryNode(node)}
            {@render node.content(navigator(node), node.arguments)}
        {:else}
            {@render node.content(navigator(node))}
        {/if}
    {:else}
        Expect navigatorFn, got {navigator}
    {/if}
{/snippet}

{#each $stack as thing}
    {@render wrapper(thing)}
{/each}
