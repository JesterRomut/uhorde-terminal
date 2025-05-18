<script lang="ts">
    import type { Snippet } from "svelte";
    import {
        entry,
        isSingleStoryNode,
        type MultipleStoryNodes,
        type StoryNavigator,
        type StoryNavigatorForked,
        type StoryNavigatorSingle,
        type StoryNode,
    } from "./story";

    let stack: StoryNode[] = $state([entry]);

    const getNavigator: (node: StoryNode) => StoryNavigator = (node) => {
        console.log(node.next);
        console.log(stack);
        if (!node.next) {
            console.log("end");
            return {
                next() {},
            } as StoryNavigatorSingle;
        }
        if (!isSingleStoryNode(node.next)) {
            return {
                next(to: string) {
                    stack.push((node.next as MultipleStoryNodes)[to]);
                },
            } as StoryNavigatorForked;
        }

        return {
            next() {
                console.log(node.next);
                stack.push(node.next as StoryNode);
            },
        } as StoryNavigatorSingle;
    };
</script>

{#snippet wrapper(node: StoryNode)}
    {@render node.content(getNavigator(node))}
{/snippet}

{#each stack as thing}
    {@render wrapper(thing)}
{/each}
