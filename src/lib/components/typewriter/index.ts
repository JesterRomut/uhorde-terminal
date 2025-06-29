import { mount, type Component } from "svelte";
import type {
    TypewriterCallback,
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
    isArray,
    partial,
    set,
} from "lodash-es";
import type { Readable } from "svelte/store";
import { _typewriter, _typewriterDeep } from "./internal";

export async function callback<T extends (...args: any) => any | Promise<any>>(
    fn: TypewriterCallback<T> | undefined,
    ...args: Parameters<T>
): Promise<Awaited<ReturnType<T>> | Awaited<ReturnType<T>>[]> {
    //console.log(fn);
    if (fn) {
        if (Array.isArray(fn)) {
            let results = [];
            for (let func of fn) {
                //console.log(func);
                results.push(await func(...args));
            }
            return results;
        } else return await fn(...args);
    }
    return [];
}

function mergePluginCallbacks(plugins: TypewriterPlugin[]) {
    let callbacks = {};
    //console.log(plugins);
    forEach(plugins, (plugin) => {
        let pluginCallbacks = plugin;
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
    return callbacks;
}

function typewriterBuilder(
    fn: TypewriterFn,
    param: TypewriterParams,
    plugins?: TypewriterPlugin[]
) {
    let callbacks = {};
    //console.log(plugins);
    if (plugins) callbacks = mergePluginCallbacks(plugins);
    // forEach(plugins, (plugin) => {
    //     let pluginCallbacks = plugin();
    //     forEach(entries(pluginCallbacks), ([eventName, callback]) => {
    //         if (!has(callbacks, eventName)) {
    //             set(callbacks, eventName, callback);
    //         } else
    //             set(
    //                 callbacks,
    //                 eventName,
    //                 concat(callbacks[eventName], callback)
    //             );
    //     });
    // });
    let { base, output } = param;
    return fn(base, output, callbacks);
}

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
    return {
        postappend: (e: Node, output: Element) => {
            if (!cursor) return;

            // new Promise((fulfil) => {
            //     setTimeout(fulfil, 10);
            // }).then(() => {

            if (e instanceof Element) {
                e.insertAdjacentElement("afterend", cursor);
                return;
            }
            // else if (e.parentNode) {
            //     e.parentNode.insertBefore(cursor, e.nextSibling);
            //     //e.parentNode.append(cursor);
            // }
            //});

            //output.appendChild(cursor);
        },
    } satisfies TypewriterPlugin;
}

export function time(amount: number) {
    return {
        postappend: async (e: Node) => {
            await new Promise((fulfil) => {
                setTimeout(fulfil, amount);
            });
        },
    } satisfies TypewriterPlugin;
}

export function onfinish<T extends (...args: any) => void>(
    fn: T,
    ...args: Parameters<T>
) {
    return {
        onfinish: () => {
            fn(...args);
        },
    } satisfies TypewriterPlugin;
}

// export function skippable(shouldSkip: Readable<boolean>) {
//     return (() => {
//         return {
//             onappend: () => {
//                 let skip = false;
//                 const unsubscribe = shouldSkip.subscribe((value) => {
//                     skip = value;
//                 });
//                 unsubscribe();
//                 return !skip;
//             },
//         };
//     }) satisfies TypewriterPlugin;
// }
export function skippable(
    shouldSkip: Readable<boolean>,
    ...affectedPlugins: TypewriterPlugin[]
) {
    let plugins: TypewriterPlugin[] = [];
    forEach(affectedPlugins, (pl) => {
        if (!pl.postappend) return;
        let plugin = pl;

        if (isArray(plugin.postappend)) {
            forEach(plugin.postappend, (postappend, index) => {
                if (!plugin.postappend) return false;
                (
                    plugin.postappend as ((
                        node: Node,
                        output: Element
                    ) => void | Promise<void>)[]
                )[index] = async (node, output) => {
                    let skip = false;
                    const unsubscribe = shouldSkip.subscribe((value) => {
                        skip = value;
                    });
                    unsubscribe();
                    //console.log(skip);
                    if (skip) return;
                    await postappend(node, output);
                };
            });
        } else {
            let func = plugin.postappend;
            plugin.postappend = async (node, output) => {
                let skip = false;
                const unsubscribe = shouldSkip.subscribe((value) => {
                    skip = value;
                });
                unsubscribe();
                //console.log(skip);
                if (skip) return;
                await func?.(node, output);
            };
        }
        plugins.push(plugin);
    });
    // return {
    //     onappend: () => {

    //         return !skip;
    //     },
    // };
    return plugins;
}

export const defaultComponentMap = { Logos } satisfies Record<
    string,
    Component
>;
export type DefaultAvailableComponentId = keyof typeof defaultComponentMap;

export function components(mapping?: Record<string, Component>) {
    let compMap: Record<string, Component> = mapping || defaultComponentMap;

    return {
        postappend: (node: Node, output: Element) => {
            if (!(node instanceof HTMLElement)) return;
            const componentName = node.dataset["uhordeSvComponent"];
            if (!componentName) return;
            //const propsStr = node.dataset.props;
            if (!has(compMap, componentName))
                throw new TypeError(`expect compMap key, got ${componentName}`);
            mount(compMap[componentName], { target: output });
            node.remove();
        },
    } satisfies TypewriterPlugin;
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
