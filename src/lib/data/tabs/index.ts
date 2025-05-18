import Registry from "$lib/classes/Registry";

interface TabRegistryData {
    tab: () => Promise<any>;
    load: () => Promise<any>;
}

const tab = (tab: () => Promise<any>, load: () => Promise<object>) => {
    return {
        tab: tab,
        load: load,
    } as TabRegistryData;
};

export const tabRegistry = Registry.object()
    .register(
        "main",
        tab(
            async () => import("$lib/data/tabs/main/Tab.svelte"),
            async () => (await import("$lib/data/tabs/main/tab")).default()
        )
    )
    .register(
        "manual",
        tab(
            async () => import("$lib/data/tabs/manual/Tab.svelte"),
            async () => (await import("$lib/data/tabs/manual/tab")).default()
        )
    )
    .register(
        "test",
        tab(
            async () => import("$lib/data/tabs/test/Tab.svelte"),
            async () => (await import("$lib/data/tabs/test/tab")).default()
        )
    );

export type TabId = keyof typeof tabRegistry.registry;
