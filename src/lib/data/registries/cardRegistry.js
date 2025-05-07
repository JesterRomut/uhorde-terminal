/**
 * @typedef {object} CardData
 * @property {import("svelte").Snippet} title
 * @property {import("svelte").Snippet} background
 */

/**
 * @type {Map<string, CardData>}
 */
export const cardRegistry = new Map();

import * as missing from "../cards/MissingNo.svelte";
/**@type {CardData} */
export const missingNo = missing;

import * as uhrwerk from "../cards/characters/Uhrwerk.svelte";
cardRegistry.set("character/uhrwerk", uhrwerk);
