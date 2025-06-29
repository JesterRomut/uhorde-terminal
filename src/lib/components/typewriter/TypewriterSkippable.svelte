<script lang="ts">
    import { onMount } from "svelte";
    import { typewriter, time, skippable, cursored } from ".";
    import { type TypewriterBuilderFn, type TypewriterPlugin } from "./types";
    import { writable } from "svelte/store";
    import { concat, isNil } from "lodash-es";
    //type TypewriterFn = (base: Element, output: Element, time: number) => { start: () => Promise<void>; };

    interface Props {
        plugins?: TypewriterPlugin[];
        skippablePlugins: TypewriterPlugin[];
        fn?: TypewriterBuilderFn;
        children: any;
        cursor?: boolean;
    }

    let {
        children,
        plugins,
        fn,
        skippablePlugins,
        cursor = true,
    }: Props = $props();

    let terminal: Element | undefined;

    let terminalClone: Element | undefined = $state();

    let shouldSkip = writable(false);

    let cursorElement: Element | undefined = $state();

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        //console.log(terminalClone.childNodes);
        //let terminalChildren = terminal.children.
        //console.log(terminal.childNodes);
        let typewriterInstance;
        let basePlugins = skippable(shouldSkip, ...skippablePlugins);
        if (fn) {
            typewriterInstance = fn(
                { base: terminal, output: terminalClone },
                concat(
                    plugins || [],
                    cursor && !isNil(cursorElement)
                        ? cursored(cursorElement)
                        : [],
                    basePlugins
                )
            );
        } else {
            typewriterInstance = typewriter(
                { base: terminal, output: terminalClone },
                concat(
                    plugins || [],
                    cursor && !isNil(cursorElement)
                        ? cursored(cursorElement)
                        : [],
                    basePlugins
                )
            );
        }
        let promise = typewriterInstance.start();
        promise.then(() => {
            terminal?.remove();
            cursorElement?.remove();
        });
        //if (onfinish) promise.then(onfinish);
        //if (onerror) promise.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span
    tabindex="0"
    role="button"
    onkeydown={() => {
        $shouldSkip = true;
    }}
    onclick={() => {
        $shouldSkip = true;
    }}
    bind:this={terminalClone}
>
</span>

{#if cursor}
    <span bind:this={cursorElement}>
        <span class="animate-console-blink-1s">_</span>
    </span>
{/if}
