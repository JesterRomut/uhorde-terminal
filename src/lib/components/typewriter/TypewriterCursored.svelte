<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import type { TypewriterPlugin, TypewriterBuilderFn } from "./types";
    import { cursored, typewriter, time } from ".";
    import { concat, partial } from "lodash-es";
    //type TypewriterCursoredFn = (base: Element, output: Element, time: number, cursor: Element) => { start: () => Promise<void>; };
    interface Props {
        plugins?: TypewriterPlugin[];
        fn?: TypewriterBuilderFn;
        cursor?: Snippet;
        removeCursorWhenFinish?: boolean;
        children: any;
    }

    let {
        children,
        plugins,
        cursor: customCursor,
        removeCursorWhenFinish = true,
        fn,
    }: Props = $props();

    let terminal: Element | undefined;

    let terminalClone: Element | undefined;

    let cursorElement: Element | undefined = $state();

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        if (!cursorElement) throw TypeError("cursorElement not bound!");

        let typewriterInstance;

        const cursorPlugin = partial(cursored, cursorElement);
        if (fn) {
            typewriterInstance = fn(
                { base: terminal, output: terminalClone },
                concat(plugins || [time(100)], [cursorPlugin()])
            );
        } else {
            typewriterInstance = typewriter(
                { base: terminal, output: terminalClone },
                concat(plugins || [time(100)], [cursorPlugin()])
            );
        }

        let promise = typewriterInstance.start();
        promise.then(() => {
            terminal?.remove();
            if (removeCursorWhenFinish) cursorElement?.remove();
        });
        //if (onfinish) promise.then(onfinish);
        //if (onerror) promise.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={terminalClone}></span>

<span bind:this={cursorElement}>
    {#if customCursor}
        {@render customCursor()}
    {:else}
        <span class="animate-console-blink-1s">_</span>
    {/if}
</span>
