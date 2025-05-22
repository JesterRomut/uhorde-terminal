<script lang="ts">
    import { onMount } from "svelte";
    import { typewriter, time } from ".";
    import { type TypewriterBuilderFn, type TypewriterPlugin } from "./types";
    //type TypewriterFn = (base: Element, output: Element, time: number) => { start: () => Promise<void>; };

    interface Props {
        plugins?: TypewriterPlugin[];
        fn?: TypewriterBuilderFn;
        children: any;
    }

    let { children, plugins, fn }: Props = $props();

    let terminal: Element | undefined;

    let terminalClone: Element | undefined;

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        //console.log(terminalClone.childNodes);
        //let terminalChildren = terminal.children.
        //console.log(terminal.childNodes);
        let typewriterInstance;
        if (fn) {
            typewriterInstance = fn(
                { base: terminal, output: terminalClone },
                plugins || [time(100)]
            );
        } else {
            typewriterInstance = typewriter(
                { base: terminal, output: terminalClone },
                plugins || [time(100)]
            );
        }
        let promise = typewriterInstance.start();
        promise.then(() => {
            terminal?.remove();
        });
        //if (onfinish) promise.then(onfinish);
        //if (onerror) promise.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={terminalClone}></span>
