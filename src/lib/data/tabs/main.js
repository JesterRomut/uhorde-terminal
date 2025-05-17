/**
 * @typedef {object} Data
 * @property {import("$lib/classes/WeightedRandom").WeightedRandom<string>} codes
 */

/**@returns {Promise<Data>} */
export default async function load() {
    const codes = await import("$lib/data/documents/accessCode");
    return {
        codes: codes.accessCodes,
    };
}
