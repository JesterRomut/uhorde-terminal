import type { Snippet } from "svelte";
import typia from "typia";
import type { Writable } from "svelte/store";

export type NextStoryNode = StoryNode | (() => StoryNode);

// export interface MultipleNextStoryNodes {
//     [index: string]: NextStoryNode;
// }

export type MultipleNextStoryNodes = Record<string, NextStoryNode>;

export interface StoryNode {
    content: Snippet<[StoryNavigator]> | ((...args: any[]) => any);
    next?: NextStoryNode | MultipleNextStoryNodes;
}

export interface StoryNodeArgumented<T extends unknown[] = unknown[]>
    extends StoryNode {
    content: Snippet<[StoryNavigator, T]> | ((...args: any[]) => any);
    arguments: T;
}

export type AnyStoryNode = StoryNode | StoryNodeArgumented;
export type StoryNodes = Record<string, AnyStoryNode>;

// export type AnyStoryNode = StoryNode | StoryNodeWrapped;

export const isSingleNextStoryNode = typia.createIs<NextStoryNode>();
export const isArgumentedStoryNode = typia.createIs<StoryNodeArgumented>();

export interface StoryNavigator {
    next: (...args: any[]) => void;
    /**
     * 
     * Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.

@param start
The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.

@param end
The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
     */
    keep: (start?: number, end?: number) => void;

    clear: () => void;

    stack: Writable<StoryNode[]>;
}

export interface StoryNavigatorSingle extends StoryNavigator {
    next: () => void;
}

export interface StoryNavigatorForked extends StoryNavigator {
    next: (to: string | number) => void;
}
