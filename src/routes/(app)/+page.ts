import type { PageLoad } from "./$types";

export const load = (async ({ url }) => {
    try {
        return { debug: url.searchParams.has("debug") };
    } catch (e) {
        return { debug: false };
    }
}) satisfies PageLoad;
