<script lang="ts">
    import { onMount } from "svelte";
    import { typewriter, type TypewriterFn } from "./typewriter";
    //type TypewriterFn = (base: Element, output: Element, time: number) => { start: () => Promise<void>; };

    interface Props {
        onfinish?: () => void;
        onerror?: (reason: any) => void;
        time?: number;
        fn?: TypewriterFn;
        children: any;
    }

    
    let { children, time = 200, onfinish, onerror, fn }: Props = $props();

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
            typewriterInstance = fn(terminal, terminalClone, time);
        } else {
            typewriterInstance = typewriter(terminal, terminalClone, time);
        }
        let promise = typewriterInstance.start();
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
