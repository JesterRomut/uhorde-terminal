import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-cloudflare";
import remarkBreaks from "remark-breaks";

import { dirname, join } from "path";
import { fileURLToPath } from "node:url";

const storyLayout = join(
    dirname(fileURLToPath(import.meta.url)),
    "./src/lib/layouts/StoryLayout.svelte"
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: { adapter: adapter() },
    preprocess: [
        mdsvex({
            extensions: [".svx", ".md"],
            remarkPlugins: [remarkBreaks],
            layout: {
                story: storyLayout,
            },
            //layout: path_to_layout,
        }),
    ],
    extensions: [".svelte", ".svx", ".md"],
    compilerOptions: {
        customElement: true,
    },
};

export default config;
