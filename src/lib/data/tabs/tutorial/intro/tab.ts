interface Content {
    stories: unknown[];
    // tutor0: any;
    // tutor1: any;
}

export interface Data {
    content: Content;
}

function batchImport<T>(importFn: (i: number) => Promise<T>, count: number) {
    const stories: Promise<T>[] = [];
    const storyIndex = Array.from({ length: count }, (_, i) => i);

    for (const i of storyIndex) {
        stories.push(importFn(i));
    }
    return stories;
}

export default async function load(): Promise<Data> {
    // const stories: Snippet[] = [];
    // const storyIndex = Array.from({ length: 16 }, (_, i) => i);

    // await (async () => {
    //     for (const i of storyIndex) {
    //         stories.push((await import(`./content.sectioned/${i}.md`)).default);
    //     }
    // })();
    return {
        content: {
            stories: (
                await Promise.all(
                    batchImport(
                        (i) => import(`./content.sectioned/story${i}.md`),
                        14
                    )
                )
            ).map((value) => value.default),
            // tutor0: tutor0,
            // tutor1: tutor1,
        },
    };
}
