<script>
    import { onMount } from "svelte";
    import { typewriter, typewriterString } from "./typewriter";

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

        //console.log(terminal.childNodes);
        let typer = typewriterString(terminal, time).start();
        if (onfinish) typer.then(onfinish);
        if (onerror) typer.catch(onerror);
    });
</script>

<span bind:this={terminal}>
    {@render children()}
</span>
