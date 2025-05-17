/**
 * @typedef {object} Data
 *  @property {import("svelte").Snippet[]} stories
 */
//
/**@returns {Promise<Data>} */
export default async function load() {
    // const codes = await import("$lib/data/documents/accessCode");
    // return {
    //     codes: codes.accessCodes,
    // };
    /**@type {import("svelte").Snippet[]}*/
    const stories = [];
    const story = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    await (async () => {
        for (let i = 0; i < story.length; i++) {
            stories.push(
                (await import(`./story.sectioned/${story[i]}.md`)).default
            );
        }
    })();
    return { stories: stories };
}
