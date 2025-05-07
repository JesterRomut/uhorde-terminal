/**
 * @param {Element} base
 * @param {Element} output
 * @param {number} time
 * @param {((node: Node) => void)[]} [onappend]
 */
export function typewriterMover(base, output, time, onappend) {
    /**
     * @type {Array<Node> | undefined}
     */
    let arr = undefined;
    let i = 0;

    /**@param {Element} _output*/
    async function _type(_output) {
        if (arr == undefined) {
            arr = base.childNodes.values().toArray();
        }
        if (i < arr.length) {
            _output.appendChild(arr[i]);
            if (onappend) onappend.forEach((func) => func(_output));
            i++;
            await new Promise((fulfil) => {
                setTimeout(fulfil, time);
            });
            await _type(_output);
        }
    }
    return { start: () => _type(output) };
}

/**
 *
 * @param {Element} base
 * @param {Element} output
 * @param {number} time
 * @param {Element} [cursor]
 *
 * @param {((node: Node) => void)[]} [onappend]
 */
export function typewriterMoverCursored(base, output, time, cursor, onappend) {
    /**@param {Node} e */
    let func = (e) => {
        if (!(e instanceof Element)) return;
        if (cursor) e.insertAdjacentElement("afterend", cursor);
    };
    if (!onappend) return typewriterMover(base, output, time, [func]);
    return typewriterMover(base, output, time, [func, ...onappend]);
}

/**
 * 实验性：可能导致元素顺序错乱
 * @param {Element} base
 * @param {Element} output
 * @param {number} time
 * @param {(node:Node) => void} [onappend]
 */
export function typewriterMoverDeep(base, output, time, onappend) {
    async function _type() {
        /**@param {Node} node
         * @param {Node} output
         */
        async function _deeptype(node, output) {
            let children = [];
            if (node.hasChildNodes()) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    let child = node.childNodes[i];
                    children.push(child);
                    await _deeptype(child, output);
                }
            }

            await new Promise((fulfil) => {
                setTimeout(fulfil, time);
            });
            output.appendChild(node);
            if (onappend) onappend(node);
            children.forEach((child) => {
                node.appendChild(child);
                if (onappend) onappend(child);
            });
        }

        let { childNodes } = base;
        for (let i = 0; i < childNodes.length; i++) {
            await _deeptype(childNodes[i], output);
        }
    }

    return { start: () => _type() };
}

/**
 * 实验性：可能导致元素顺序错乱
 * @param {Element} base
 * @param {Element} output
 * @param {number} time
 * @param {Element} [cursor]
 */
export function typewriterMoverCursoredDeep(base, output, time, cursor) {
    return typewriterMoverDeep(base, output, time, (e) => {
        if (!(e instanceof Element)) return;
        if (cursor) e.insertAdjacentElement("afterend", cursor);
    });
}
