import type { Snippet } from "svelte";

export interface CardData {
    title?: Snippet;
    background: Snippet;
    category?: Snippet;
    display: string;
}

import * as missing from "./MissingNo.svelte";

export const missingNo: CardData = missing;

import * as uhrwerk from "./characters/Uhrwerk.svelte";

import * as amenGleph from "./characters/AmenGleph.svelte";

import * as amenGlephDead from "./characters/AmenGlephDead.svelte";

import * as observe from "./actions/Observe.svelte";

import Registry from "$lib/classes/Registry";

//export const cardRegistry = new CardRegistry();
export const cardRegistry = Registry.object()
    .register("character:uhrwerk", uhrwerk)
    .register("character:amen_gleph", amenGleph)
    .register("character:amen_gleph:dead", amenGlephDead)
    .register("action:observe", observe);

export type CardId = keyof typeof cardRegistry.registry;
