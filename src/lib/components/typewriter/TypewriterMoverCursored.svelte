<script>
    import { onMount } from "svelte";
    import { typewriterMoverCursored } from "./typewriterMover";
    /**
     * @typedef {(base: Element, output: Element, time: number, cursor:Element) => {start: () => Promise<void>}} TypewriterCursoredFn
     */
    /**
     * @typedef {Object} Props
     * @property {() => void} [onfinish]
     * @property {(reason: any) => void} [onerror]
     * @property {number} [time]
     * @property {import("svelte").Snippet} [cursor]
     * @property {boolean} [removeCursorWhenFinish]
     * @property {TypewriterCursoredFn} [fn]
     * @property {*} children
     */

    /**
     * @type {Props}
     */
    let {
        children,
        time = 200,
        onfinish,
        onerror,
        cursor,
        removeCursorWhenFinish = true,
        fn,
    } = $props();

    /**
     * @type {Element | undefined}
     */
    let terminal;

    /**@type {Element |undefined}*/
    let cursorElement;

    /**
     * @type {Element | undefined}
     */
    let terminalClone;

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        if (!cursorElement) throw TypeError("cursorElement not bound!");

        let typewriter;
        if (fn) {
            typewriter = fn(terminal, terminalClone, time, cursorElement);
        } else {
            typewriter = typewriterMoverCursored(
                terminal,
                terminalClone,
                time,
                cursorElement
            );
        }
        let promise = typewriter.start();
        promise.then(() => {
            terminal?.remove();
            if (removeCursorWhenFinish) cursorElement?.remove();
        });
        if (onfinish) promise.then(onfinish);
        if (onerror) promise.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={cursorElement}>
    {#if cursor}
        {@render cursor()}
    {:else}
        <span class="animate-console-blink-1s">_</span>
    {/if}
</span>

<span bind:this={terminalClone}></span>
