import type { Snippet } from "svelte";
import { content, contentAlt, contentForked } from "./BeautifulStory.svelte";
import typia from "typia";

// function partial<T>(func: (...args: any[]) => T, ...args: any[]) {
//     return (...rest: any[]) => {
//         return func(...args, ...rest);
//     };
// }
export interface MultipleStoryNodes {
    [index: string]: StoryNode;
}

export interface StoryNode {
    content: Snippet<[StoryNavigator]> | ((...args: any[]) => any);
    next?: StoryNode | MultipleStoryNodes;
}

export const isSingleStoryNode = typia.createIs<StoryNode>();
//export const isMultipleNodes = typia.createValidate<MultipleStoryNodes>();

export interface StoryNavigator {
    next: (...args: any[]) => void;
}

export interface StoryNavigatorSingle extends StoryNavigator {
    next: () => void;
}

export interface StoryNavigatorForked extends StoryNavigator {
    next: (to: string | number) => void;
}

const end: StoryNode = {
    content: content,
    next: undefined,
};

const other: StoryNode = {
    content: contentAlt,
    next: end,
};

const next: StoryNode = {
    content: content,
    next: end,
};

export const entry: StoryNode = {
    content: contentForked,
    next: { one: next, two: other } as MultipleStoryNodes,
};
