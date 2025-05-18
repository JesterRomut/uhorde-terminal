import type { Writable } from "svelte/store";
import type { CardInstance } from "./card";
import type { TabId } from "../tabs";

export interface AppState {
    cards: Writable<CardInstance[]>;
    terminal: () => Element | undefined;
    tab: Writable<TabId>;
}

export type TabProps = {
    data: object;
    context: AppState;
};
