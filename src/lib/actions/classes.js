/**
 * @type {import("svelte/action").Action<Element, string | string[]>}
 * @param {Element} node
 * @param {string | string[]} classes
 */
export const classes = (node, classes) => {
    const tokens = Array.isArray(classes) ? classes : [classes];

    node.classList.add(...tokens);

    return {
        destroy() {
            node.classList.remove(...tokens);
        },
    };
};
