export type TypewriterResult = { start: () => Promise<void> };

export type TypewriterFn = (
    base: Element,
    output: Element,
    time: number,
    onappend?: ((node: Node) => void)[]
) => TypewriterResult;

export type TypewriterCursoredFn = (
    base: Element,
    output: Element,
    time: number,
    cursor: Element,
    onappend?: ((node: Node) => void)[]
) => TypewriterResult;

export const typewriter: TypewriterFn = (base, output, time, onappend) => {
    let arr: Array<Node> | undefined = undefined;
    let i = 0;

    async function _type(_output: Element) {
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
};

export const typewriterCursored: TypewriterCursoredFn = (
    base,
    output,
    time,
    cursor,
    onappend
) => {
    let func = (e: Node) => {
        if (!(e instanceof Element)) return;
        if (cursor) e.insertAdjacentElement("afterend", cursor);
    };
    if (!onappend) return typewriter(base, output, time, [func]);
    return typewriter(base, output, time, [func, ...onappend]);
};

/**
 * reload时候需要刷新才能加载
 */
export const typewriterDeep: TypewriterFn = (base, output, time, onappend) => {
    async function _type() {
        /** @param {Node} node @param {Node} parent */
        async function moveNode(node: Node, parent: Node) {
            // 创建副本保留原节点内容，避免直接操作原始节点
            const clone = node.cloneNode(false); // 浅拷贝（不含子节点）

            await new Promise((resolve) => setTimeout(resolve, time));
            parent.appendChild(clone);
            if (onappend) onappend.forEach((func) => func(clone));

            // 递归处理子节点
            const children = Array.from(node.childNodes);
            for (const child of children) {
                await moveNode(child, clone);
            }
        }

        // 清空输出容器并按顺序处理根节点
        output.innerHTML = "";
        const children = Array.from(base.childNodes);
        for (const child of children) {
            await moveNode(child, output);
        }
    }

    return { start: () => _type() };
};

/**
 */
export const typewriterCursoredDeep: TypewriterCursoredFn = (
    base,
    output,
    time,
    cursor,
    onappend
) => {
    let func = (e: Node) => {
        if (!(e instanceof Element)) return;
        if (cursor) e.insertAdjacentElement("afterend", cursor);
    };
    if (!onappend) return typewriterDeep(base, output, time, [func]);
    return typewriterDeep(base, output, time, [func, ...onappend]);
    //return typewriterMoverDeep(base, output, time, );
};
