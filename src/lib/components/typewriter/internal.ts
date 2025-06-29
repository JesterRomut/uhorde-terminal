import { isArray, findIndex } from "lodash-es";
import { callback } from ".";
import type { TypewriterFn } from "./types";

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

            // 递归搬运子节点
            for (const child of children) {
                await moveNode(child, node);
            }
            let preResults = await callback(
                callbacks.onappend || (() => true),
                node,
                output
            );
            //console.log(preResults);
            if (
                isArray(preResults)
                    ? findIndex(preResults, (val) => val === false) === -1
                    : preResults
            )
                await callback(callbacks.postappend, node, output);
        }

        // 创建基础节点的副本快照（防止实时DOM变动影响遍历）
        const children = Array.from(base.childNodes);
        for (const child of children) {
            await moveNode(child, output);
            //wait callback(callbacks.postappend, child, output);
        }
        await callback(callbacks.onfinish, output);
    }

    return { start: () => _type() };
};

export const _typewriter: TypewriterFn = (base, output, callbacks) => {
    let arr: Array<Node> | undefined = undefined;
    let i = 0;

    async function _type(_output: Element) {
        if (arr == undefined) {
            arr = base.childNodes.values().toArray();
        }
        if (i < arr.length) {
            _output.appendChild(arr[i]);
            let preResults = await callback(
                callbacks.onappend || (() => true),
                _output,
                output
            );
            if (
                isArray(preResults)
                    ? findIndex(preResults, (val) => val === false) === -1
                    : preResults
            )
                await callback(callbacks.postappend, _output, output);
            i++;

            await _type(_output);
        } else {
            callback(callbacks.onfinish, output);
        }
    }
    return { start: () => _type(output) };
};
