<script>
    import { onMount } from "svelte";
    import { typewriter, typewriterMover } from "./typewriter";

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

    /**
     * @type {Element | undefined}
     */
    let terminalClone;

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        let nodes = terminal.childNodes.entries().toArray();
        //let terminalChildren = terminal.children.
        //console.log(terminal.childNodes);
        let typer = typewriterMover(terminal, terminalClone, time).start();
        if (onfinish) typer.then(onfinish);
        if (onerror) typer.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={terminalClone}></span>
