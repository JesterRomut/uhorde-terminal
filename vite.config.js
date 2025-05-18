import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { svelteTesting } from "@testing-library/svelte/vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import svg from "@poppanator/sveltekit-svg";
import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";

export default defineConfig({
    plugins: [
        {
            name: "markdown-splitter",
            configureServer(server) {
                // 开发服务器启动时运行拆分脚本
                require("./script/split_markdown.js");
            },
        },
        paraglideVitePlugin({
            project: "./project.inlang",
            outdir: "./src/lib/paraglide",
            disableAsyncLocalStorage: true,
        }),
        tailwindcss(),
        enhancedImages(),
        sveltekit(),
        svg(),
        UnpluginTypia(),
    ],
    test: {
        workspace: [
            {
                extends: "./vite.config.js",
                plugins: [svelteTesting()],
                test: {
                    name: "client",
                    environment: "jsdom",
                    clearMocks: true,
                    include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
                    exclude: ["src/lib/server/**"],
                    setupFiles: ["./vitest-setup-client.js"],
                },
            },
            {
                extends: "./vite.config.js",
                test: {
                    name: "server",
                    environment: "node",
                    include: ["src/**/*.{test,spec}.{js,ts}"],
                    exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
                },
            },
        ],
    },
});
