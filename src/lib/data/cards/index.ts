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
export const cardRegistry = Registry.create()
    .register("character:uhrwerk", uhrwerk satisfies CardData)
    .register("character:amen_gleph", amenGleph satisfies CardData)
    .register("character:amen_gleph:dead", amenGlephDead satisfies CardData)
    .register("action:observe", observe satisfies CardData);

export type CardId = keyof typeof cardRegistry.registry;
