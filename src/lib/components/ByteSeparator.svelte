<script>
    import { onMount } from "svelte";

    let { children } = $props();

    /**@type {Element | undefined}*/
    let text;

    onMount(() => {
        text?.childNodes.forEach((node) => {
            if (!(node instanceof Text)) return;
            let content = node.textContent;
            node.textContent = "";
            if (!content) return;

            for (let i = 0; i < content.length; i++) {
                let child = document.createTextNode(content[i]);
                //child.textContent = content[i];
                node.parentNode?.appendChild(child);
            }
        });
    });
</script>

<span bind:this={text}>{@render children()}</span>
