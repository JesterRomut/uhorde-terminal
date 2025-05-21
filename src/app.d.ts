// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="mdsvex/globals" />
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }

    declare module "*.md" {
        import type { Snippet } from "svelte";
        export default (...args: unknown[]) => Snippet;

        export const metadata: Record<string, unknown>;
    }
}

import "@poppanator/sveltekit-svg/dist/svg.d.ts";

export {};
