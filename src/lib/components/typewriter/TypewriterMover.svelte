<script>
    import { onDestroy, onMount } from "svelte";
    import { typewriterMover } from "./typewriterMover";
    /**
     * @typedef {(base: Element, output: Element, time: number) => {start: () => Promise<void>}} TypewriterFn
     */

    /**
     * @typedef {Object} Props
     * @property {() => void} [onfinish]
     * @property {(reason: any) => void} [onerror]
     * @property {number} [time]
     * @property {TypewriterFn} [fn]
     * @property {*} children
     */

    /**
     * @type {Props}
     */
    let { children, time = 200, onfinish, onerror, fn } = $props();

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
        let typewriter;
        if (fn) {
            typewriter = fn(terminal, terminalClone, time);
        } else {
            typewriter = typewriterMover(terminal, terminalClone, time);
        }
        let promise = typewriter.start();
        promise.then(() => {
            terminal?.remove();
        });
        if (onfinish) promise.then(onfinish);
        if (onerror) promise.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={terminalClone}></span>
