<script>
    import { onMount } from "svelte";
    import { typewriter } from "./typewriter";

    /**
     * @typedef {Object} Props
     * @property {() => void} [onfinish]
     * @property {(reason: any) => void} [onerror]
     * @property {number} [time]
     * @property {(e: Element) => {length: number}} init
     * @property {(e: Element, innerHTML:string, arr: {length: number}, i: number) => string} process
     * @property {(e: Element, arr: {length: number}) => string} finish
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
        init,
        process,
        finish,
    } = $props();

    /**
     * @type {Element | undefined}
     */
    let terminal;

    onMount(() => {
        if (!terminal) return;
        let typer = typewriter(terminal, time, init, process, finish).start();
        if (onfinish) typer.then(onfinish);
        if (onerror) typer.catch(onerror);
    });
</script>

<span bind:this={terminal}>
    {@render children()}
</span>
