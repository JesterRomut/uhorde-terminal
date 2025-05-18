<script lang="ts">
    import { onMount } from "svelte";
    import { typewriterCursored, type TypewriterCursoredFn } from "./typewriter";
    //type TypewriterCursoredFn = (base: Element, output: Element, time: number, cursor: Element) => { start: () => Promise<void>; };
    interface Props {
        onfinish?: () => void;
        onerror?: (reason: any) => void;
        onappend?: ((node: Node) => void)[];
        time?: number;
        cursor?: import("svelte").Snippet;
        removeCursorWhenFinish?: boolean;
        showCursor?: boolean;
        fn?: TypewriterCursoredFn;
        children: any;
    }

    let {
        children,
        time = 200,
        onfinish,
        onerror,
        onappend,
        cursor,
        removeCursorWhenFinish = true,
        showCursor = true,
        fn,
    }: Props = $props();

    let terminal: Element | undefined;

    let terminalClone: Element | undefined;

    let cursorElement: Element | undefined = $state();

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        if (!cursorElement) throw TypeError("cursorElement not bound!");

        let typewriter;
        if (fn) {
            typewriter = fn(terminal, terminalClone, time, cursorElement);
        } else {
            typewriter = typewriterCursored(
                terminal,
                terminalClone,
                time,
                cursorElement,
                onappend
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
