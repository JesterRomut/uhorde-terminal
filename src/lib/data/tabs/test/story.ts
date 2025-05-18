import { content, contentAlt, contentForked } from "./BeautifulStory.svelte";
import type { StoryNode, MultipleStoryNodes } from "./types";

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
