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

export const tabRegistry = Registry.object()
    .register("main", {
        //tab: async () => import("$lib/data/tabs/main/Tab.svelte"),
        tab: async () => Main,
        load: async () => (await import("$lib/data/tabs/main/tab")).default(),
    })
    .register("tutorial", {
        //tab: async () => import("$lib/data/tabs/tutorial/Tab.svelte"),
        tab: async () => Tutorial,
        //async () => (await import("$lib/data/tabs/tutorial/tab")).default()
    })
    .register("tutorial/intro", {
        tab: async () => TutorialIntro,
        load: async () =>
            (await import("$lib/data/tabs/tutorial/intro/tab")).default(),
    })
    .register("test", {
        tab: async () => import("$lib/data/tabs/test/Tab.svelte"),
        //async () => (await import("$lib/data/tabs/test/tab")).default()
    });

export type TabId = keyof typeof tabRegistry.registry;
