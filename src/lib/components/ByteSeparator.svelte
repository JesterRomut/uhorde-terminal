<script lang="ts">
    import { onMount } from "svelte";

    let { children } = $props();

    let text: Element | undefined;

    // function recursiveProcessText(node: Node) {
    //     function _processText(textNode: Text) {
    //         let content = textNode.textContent;
    //         textNode.textContent = "";
    //         if (!content) return;

    //         for (let i = 0; i < content.length; i++) {
    //             let child = document.createTextNode(content[i]);
    //             //child.textContent = content[i];
    //             textNode.parentNode?.appendChild(child);
    //         }
    //     }
    //     if (node instanceof Text) {
    //         _processText(node);
    //         return;
    //     }
    //     if (!node.hasChildNodes()) return;
    //     node.childNodes.forEach((node) => recursiveProcessText(node));
    // }
    function recursiveProcessText(node: Node) {
        function _processText(textNode: Text) {
            const content = textNode.textContent;
            if (!content) return;

            // 创建包含所有字符节点的数组
            const newNodes = Array.from(content).map((char) =>
                document.createTextNode(char)
            );

            // 用新节点替换原文本节点
            textNode.replaceWith(...newNodes);
        }

        if (node instanceof Text) {
            _processText(node);
            return;
        }

        if (!node.hasChildNodes()) return;

        // 使用 Array.from 避免动态集合修改的问题
        Array.from(node.childNodes).forEach((child) => {
            recursiveProcessText(child);
        });
    }
    onMount(() => {
        if (!text) throw new TypeError(`expect text, got ${text}`);
        recursiveProcessText(text);
    });
</script>

<span bind:this={text}>{@render children()}</span>
