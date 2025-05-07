/**
 * @typedef {object} Logos
 * @property {!string} L
 * @property {!string} o
 * @property {!string} g
 * @property {!string} O
 * @property {!string} S
 */

import { WeightedRandom } from "$lib/classes/WeightedRandom";

/**@type {WeightedRandom<Logos>}*/
export const logos = new WeightedRandom();
logos
    .add({
        L: "Liminal",
        o: "Object",
        g: "Gatekeeper",
        O: "Of",
        S: "Stories",
    })
    .add({
        L: "Library",
        o: "Of",
        g: "Guessing",
        O: "Omni",
        S: "Science",
    })
    .add({
        L: "Logfile",
        o: "Oriented",
        g: "Global",
        O: "Operating",
        S: "System",
    })
    .add({
        L: "Lead,",
        o: "Oversight,",
        g: "Gauge,",
        O: "Ordiance,",
        S: "Sustain",
    })
    .add({
        L: "Light",
        o: "Of",
        g: "God",
        O: "Overcoming",
        S: "Sin",
    });
