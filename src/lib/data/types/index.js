/**
 * @typedef {object} AppState
 * @property {import("svelte/store").Writable<import("$lib/data/types").CardInstance[]>} cards
 * @property {() => Element | undefined} terminal
 * @property {import("svelte/store").Writable<string>} tab
 */

/**
 * @typedef {object} CardInstance
 * @property {string} type
 */

/**
 * @typedef {{data: object, context: import("$lib/data/types").AppState}} TabProps
 */

export default {};
