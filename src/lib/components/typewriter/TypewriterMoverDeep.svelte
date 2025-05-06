<script>
    import { onMount } from "svelte";
    import { typewriterMoverDeep } from "./typewriterMover";

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
        //console.log(terminalClone.childNodes);
        //let terminalChildren = terminal.children.
        //console.log(terminal.childNodes);
        let typer = typewriterMoverDeep(terminal, terminalClone, time).start();
        typer.then(() => {
            terminal?.remove();
        });
        if (onfinish) typer.then(onfinish);
        if (onerror) typer.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={terminalClone}></span>
