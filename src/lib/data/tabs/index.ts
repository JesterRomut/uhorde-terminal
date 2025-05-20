import Registry from "$lib/classes/Registry";

// const tab = (tab: () => Promise<any>, load?: () => Promise<object>) => {
//     if (!load) return { tab: tab };
//     return {
//         tab: tab,
//         load: load,
//     };
// };

export const tabRegistry = Registry.object()
    .register("main", {
        tab: async () => import("$lib/data/tabs/main/Tab.svelte"),
        load: async () => (await import("$lib/data/tabs/main/tab")).default(),
    })
    .register("tutorial", {
        tab: async () => import("$lib/data/tabs/tutorial/Tab.svelte"),
        //async () => (await import("$lib/data/tabs/tutorial/tab")).default()
    })
    .register("tutorial/intro", {
        tab: async () => import("$lib/data/tabs/tutorial/intro/Tab.svelte"),
        load: async () =>
            (await import("$lib/data/tabs/tutorial/intro/tab")).default(),
    })
    .register("test", {
        tab: async () => import("$lib/data/tabs/test/Tab.svelte"),
        //async () => (await import("$lib/data/tabs/test/tab")).default()
    });

export type TabId = keyof typeof tabRegistry.registry;
