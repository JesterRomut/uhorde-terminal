import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-cloudflare";
import remarkBreaks from "remark-breaks";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: { adapter: adapter() },
    preprocess: [
        mdsvex({
            extensions: [".svx", ".md"],
            remarkPlugins: [remarkBreaks],
        }),
    ],
    extensions: [".svelte", ".svx", ".md"],
    compilerOptions: {
        customElement: true,
    },
};

export default config;
