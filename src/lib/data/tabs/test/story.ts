import {
    content,
    contentAlt,
    contentForked,
    wrapper1,
} from "./BeautifulStory.svelte";
import {
    type StoryNode,
    type MultipleStoryNodes,
    type StoryNodeWrapped,
    isWrappedStoryNode,
} from "../../../types/story";

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

export const entry: StoryNodeWrapped = {
    content: wrapper1,
    children: contentForked,
    next: { one: next, two: other } as MultipleStoryNodes,
};
