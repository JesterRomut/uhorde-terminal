import type { Writable } from "svelte/store";
import type { CardInstance } from "./card";
import type { TabId } from "../data/tabs";

export interface TabContext {
    cards: Writable<CardInstance[]>;
    terminal: () => Element | undefined;
    tab: Writable<TabId>;
}

export type TabProps = {
    data: unknown;
    navigator: TabNavigator;
};

export interface TabNavigator {
    context: TabContext;
    goto: (id: TabId) => void;
}
