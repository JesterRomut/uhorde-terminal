/**
 * @typedef {object} CardData
 * @property {import("svelte").Snippet} title
 * @property {import("svelte").Snippet} background
 * @property {import("svelte").Snippet} category
 * @property {string} display slot text
 */

/**
 * @extends {Map<string, CardData>}
 */
class CardRegistry extends Map {
    /**
     * @param {string} type
     * @returns {CardData}
     */
    getCard(type) {
        return this.get(type) || missingNo;
    }
}

export const cardRegistry = new CardRegistry();

import * as missing from "../cards/MissingNo.svelte";

/**@type {CardData} */
export const missingNo = missing;

import * as uhrwerk from "../cards/characters/Uhrwerk.svelte";
cardRegistry.set("character:uhrwerk", uhrwerk);
