import type { Snippet } from "svelte";

export interface Data {
    stories: Snippet[];
}
//
/**@returns {Promise<Data>} */
export default async function load(): Promise<Data> {
    // const codes = await import("$lib/data/documents/accessCode");
    // return {
    //     codes: codes.accessCodes,
    // };
    const stories: Snippet[] = [];
    const storyIndex = Array.from({ length: 16 }, (_, i) => i);

    await (async () => {
        for (const i of storyIndex) {
            stories.push((await import(`./content.sectioned/${i}.md`)).default);
        }
    })();
    return { stories: stories };
}
