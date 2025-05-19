import {
    content,
    contentAlt,
    contentForked,
    wrapper1,
} from "./BeautifulStory.svelte";
import {
    type StoryNode,
    type MultipleStoryNodes,
    type StoryNodeArgumented,
    type StoryNavigator,
} from "../../../types/story";
import type { Snippet } from "svelte";

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

export const entry: StoryNodeArgumented<[Snippet<[StoryNavigator]>]> = {
    content: wrapper1,
    arguments: [contentForked],
    next: { one: next, two: other } as MultipleStoryNodes,
};
