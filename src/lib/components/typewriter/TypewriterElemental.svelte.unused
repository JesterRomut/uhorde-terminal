<script>
    import { onMount } from "svelte";
    import { typewriter } from "./typewriter";

    /**
     * @typedef {Object} Props
     * @property {() => void} [onfinish]
     * @property {(reason: any) => void} [onerror]
     * @property {number} [time]
     * @property {*} children
     */

    /**
     * @type {Props}
     */
    let { children, time = 200, onfinish, onerror } = $props();

    /**
     * @type {Element | undefined}
     */
    let terminal;

    onMount(() => {
        if (!terminal) return;
        let nodes = terminal.childNodes.entries().toArray();

        //console.log(terminal.childNodes);
        let typer = typewriter(
            terminal,
            time,
            (_) => nodes,
            (_, innerHTML, arr, i) => {
                if (!(arr instanceof Array))
                    throw new TypeError(`Expect Array, found ${arr}`);
                /** @type {ChildNode}*/
                let node = arr[i][1];
                let res = node instanceof Element ? node.outerHTML + "_" : "";
                return innerHTML.replace(/_$/, "") + res;
            },
            (_, arr) => {
                if (!(arr instanceof Array))
                    throw new TypeError(`Expect Array, found ${arr}`);

                return nodes
                    .map((value) => {
                        let node = value[1];
                        if (!(node instanceof Element)) return "";
                        return `${node.outerHTML}`;
                    })
                    .join("");
            }
        ).start();
        if (onfinish) typer.then(onfinish);
        if (onerror) typer.catch(onerror);
    });
</script>

<span bind:this={terminal}>
    {@render children()}
</span>
