import {
    content,
    contentAlt,
    contentForked,
    wrapper1,
} from "./BeautifulStory.svelte";
import {
    type StoryNode,
    type MultipleNextStoryNodes,
    type StoryNodeArgumented,
    type StoryNavigator,
    type AnyStoryNode,
    type NextStoryNode,
} from "../../../types/story";
import type { Snippet } from "svelte";
import Story from "$lib/components/Story.svelte";
import typia from "typia";

const end: StoryNode = {
    content: content,
    next: undefined,
};

// const other: StoryNode = {
//     content: contentAlt,
//     next: end,
// };

// const next: StoryNode = {
//     content: content,
//     next: end,
// };

// export const entry: StoryNodeArgumented<[Snippet<[StoryNavigator]>]> = {
//     content: wrapper1,
//     arguments: [contentForked],
//     next: { one: next, two: other } as MultipleNextStoryNodes,
// };

// interface StoryNodes {
//     [index: string]: StoryNode;
// }

export const story: Record<string, AnyStoryNode> = {
    entry: {
        content: wrapper1,
        arguments: [contentForked],
        next: { one: () => story.next, two: () => story.other },
    },
    next: {
        content: content,
        next: end,
    },
    other: {
        content: contentAlt,
        next: () => story.end,
    },
    end: {
        content: content,
        next: undefined,
    },
};

console.log(typia.validate<NextStoryNode>(story.entry.next));
console.log(typia.validate<NextStoryNode>(story.next.next));
console.log(typia.validate<NextStoryNode>(story.other.next));
