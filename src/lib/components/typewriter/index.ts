import { mount, type Component } from "svelte";
import type {
    TypewriterCallback,
    TypewriterCallbacks,
    TypewriterFn,
    TypewriterParams,
    TypewriterPlugin,
} from "./types";
import Logos from "../Logos.svelte";
import {
    concat,
    entries,
    forEach,
    has,
    keys,
    map,
    mapValues,
    partial,
    set,
} from "lodash-es";

async function callback<T extends (...args: any) => void | Promise<void>>(
    fn: TypewriterCallback<T> | undefined,
    ...args: Parameters<T>
) {
    //console.log(fn);
    if (fn) {
        if (Array.isArray(fn)) {
            for (let func of fn) {
                //console.log(func);
                await func(...args);
            }
        } else await fn(...args);
    }
}

function typewriterBuilder(
    fn: TypewriterFn,
    param: TypewriterParams,
    plugins?: TypewriterPlugin[]
) {
    let callbacks = {};
    //console.log(plugins);
    if (plugins)
        forEach(plugins, (plugin) => {
            let pluginCallbacks = plugin();
            forEach(entries(pluginCallbacks), ([eventName, callback]) => {
                if (!has(callbacks, eventName)) {
                    set(callbacks, eventName, callback);
                } else
                    set(
                        callbacks,
                        eventName,
                        concat(callbacks[eventName], callback)
                    );
            });
        });
    let { base, output } = param;
    return fn(base, output, callbacks);
}

export const _typewriter: TypewriterFn = (base, output, callbacks) => {
    let arr: Array<Node> | undefined = undefined;
    let i = 0;

    async function _type(_output: Element) {
        if (arr == undefined) {
            arr = base.childNodes.values().toArray();
        }
        if (i < arr.length) {
            _output.appendChild(arr[i]);
            await callback(callbacks.postappend, _output, output);
            i++;

            await _type(_output);
        } else {
            callback(callbacks.onfinish, output);
        }
    }
    return { start: () => _type(output) };
};

/**
 * reload时候需要刷新才能加载
 */
export const _typewriterDeep: TypewriterFn = (base, output, callbacks) => {
    // async function _type() {
    //     async function moveNode(node: Node, parent: Node) {
    //         // 创建副本保留原节点内容，避免直接操作原始节点
    //         const clone = node.cloneNode(false); // 浅拷贝（不含子节点）

    //         //await new Promise((resolve) => setTimeout(resolve, time));
    //         parent.appendChild(clone);
    //         await callback(callbacks.postappend, clone, output);

    //         // 递归处理子节点
    //         const children = Array.from(node.childNodes);
    //         for (const child of children) {
    //             await moveNode(child, clone);
    //         }
    //     }

    //     // 清空输出容器并按顺序处理根节点
    //     //output.innerHTML = "";
    //     const children = Array.from(base.childNodes);
    //     for (const child of children) {
    //         await moveNode(child, output);
    //     }
    //     callback(callbacks.onfinish, output);
    // }
    async function _type() {
        async function moveNode(node: Node, parent: Node) {
            // 直接移动原始节点到新父容器
            parent.appendChild(node);

            // 保存当前节点的子节点快照（因为直接操作会改变childNodes）
            const children = Array.from(node.childNodes);

            // 先移除所有子节点以便逐个重新添加
            children.forEach((child) => node.removeChild(child));
            await callback(callbacks.postappend, node, output);

            // 递归搬运子节点
            for (const child of children) {
                await moveNode(child, node);
            }
        }

        // 创建基础节点的副本快照（防止实时DOM变动影响遍历）
        const children = Array.from(base.childNodes);
        for (const child of children) {
            await moveNode(child, output);
        }
        callback(callbacks.onfinish, output);
    }

    return { start: () => _type() };
};

export function typewriter(
    param: TypewriterParams,
    plugins?: TypewriterPlugin[]
) {
    return partial(typewriterBuilder, _typewriter, param, plugins)();
}

export function typewriterDeep(
    param: TypewriterParams,
    plugins?: TypewriterPlugin[]
) {
    return partial(typewriterBuilder, _typewriterDeep, param, plugins)();
}

export function cursored(cursor: Element) {
    return (() => {
        return {
            postappend: (e: Node, output: Element) => {
                if (!cursor) return;

                // new Promise((fulfil) => {
                //     setTimeout(fulfil, 10);
                // }).then(() => {
                if (e.parentNode) {
                    e.parentNode.append(cursor);
                }
                //});

                //output.appendChild(cursor);
            },
        };
    }) satisfies TypewriterPlugin;
}

export function time(amount: number) {
    return (() => {
        return {
            postappend: async (e: Node) => {
                await new Promise((fulfil) => {
                    setTimeout(fulfil, amount);
                });
            },
        };
    }) satisfies TypewriterPlugin;
}

export function onfinish<T extends (...args: any) => void>(
    fn: T,
    ...args: Parameters<T>
) {
    return (() => {
        return {
            onfinish: () => {
                fn(...args);
            },
        };
    }) satisfies TypewriterPlugin;
}

export const defaultComponentMap = { Logos } satisfies Record<
    string,
    Component
>;
export type DefaultAvailableComponentId = keyof typeof defaultComponentMap;

export function components(mapping?: Record<string, Component>) {
    let compMap: Record<string, Component> = mapping || defaultComponentMap;
    return (() => {
        return {
            postappend: (node: Node, output: Element) => {
                if (!(node instanceof HTMLElement)) return;
                const componentName = node.dataset["uhordeSvComponent"];
                if (!componentName) return;
                //const propsStr = node.dataset.props;
                if (!has(compMap, componentName))
                    throw new TypeError(
                        `expect compMap key, got ${componentName}`
                    );
                mount(compMap[componentName], { target: output });
                node.remove();
            },
        };
    }) satisfies TypewriterPlugin;
}

// export const typewriterCursored: TypewriterCursoredFn = (
//     base,
//     output,
//     time,
//     cursor,
//     onappend
// ) => {
//     let func = (e: Node) => {
//         if (!(e instanceof Element)) return;
//         if (cursor) e.insertAdjacentElement("afterend", cursor);
//     };
//     if (!onappend) return typewriter(base, output, time, [func]);
//     return typewriter(base, output, time, [func, ...onappend]);
// };

// /**
//  */
// export const typewriterCursoredDeep: TypewriterCursoredFn = (
//     base,
//     output,
//     time,
//     cursor,
//     onappend
// ) => {
//     let func = (e: Node) => {
//         if (!(e instanceof Element)) return;
//         if (cursor) e.insertAdjacentElement("afterend", cursor);
//     };
//     if (!onappend) return typewriterDeep(base, output, time, [func]);
//     return typewriterDeep(base, output, time, [func, ...onappend]);
//     //return typewriterMoverDeep(base, output, time, );
// };
