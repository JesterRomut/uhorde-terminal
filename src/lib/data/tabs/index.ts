import Registry from "$lib/classes/Registry";

import * as Main from "$lib/data/tabs/main/Tab.svelte";
import * as Tutorial from "$lib/data/tabs/tutorial/Tab.svelte";
import * as TutorialIntro from "$lib/data/tabs/tutorial/intro/Tab.svelte";
// const tab = (tab: () => Promise<any>, load?: () => Promise<object>) => {
//     if (!load) return { tab: tab };
//     return {
//         tab: tab,
//         load: load,
//     };
// };

interface TabData {
    tab: () => Promise<unknown>;
    load?: () => Promise<object>;
}

export const tabRegistry = Registry.create()
    .register("main", {
        //tab: async () => import("$lib/data/tabs/main/Tab.svelte"),
        tab: async () => Main,
        load: async () => (await import("$lib/data/tabs/main/tab")).default(),
    } satisfies TabData)
    .register("tutorial", {
        //tab: async () => import("$lib/data/tabs/tutorial/Tab.svelte"),
        tab: async () => Tutorial,
        //async () => (await import("$lib/data/tabs/tutorial/tab")).default()
    } satisfies TabData)
    .register("tutorial/intro", {
        tab: async () => TutorialIntro,
        load: async () =>
            (await import("$lib/data/tabs/tutorial/intro/tab")).default(),
    } satisfies TabData)
    .register("test", {
        tab: async () => import("$lib/data/tabs/test/Tab.svelte"),
        //async () => (await import("$lib/data/tabs/test/tab")).default()
    } satisfies TabData);

export type TabId = keyof typeof tabRegistry.registry;
