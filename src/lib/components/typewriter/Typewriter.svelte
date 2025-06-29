<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { typewriter, time, cursored, skippable, typewriterDeep } from ".";
    import { type TypewriterBuilderFn, type TypewriterPlugin } from "./types";
    import { concat, defaultsDeep, isNil } from "lodash-es";
    import { writable } from "svelte/store";
    //type TypewriterFn = (base: Element, output: Element, time: number) => { start: () => Promise<void>; };

    interface CursoredSettings {
        enabled: boolean;
        cursor: Snippet | null;
        removeCursorWhenFinish: boolean;
    }

    interface SkippableSettings {
        enabled: boolean;
        skippablePlugins: TypewriterPlugin[];
    }
    interface Props {
        plugins?: TypewriterPlugin[];
        fn?: TypewriterBuilderFn;
        children: Snippet;
        cursored?: Partial<CursoredSettings>;
        skippable?: Partial<SkippableSettings>;
    }

    let {
        children,
        plugins,
        fn,
        cursored: cursoredSettingsGiven = {},
        skippable: skippableSettingsGiven = {},
    }: Props = $props();

    let terminal: Element | undefined;

    let terminalClone: Element | undefined = $state();

    let cursorElement: Element | undefined = $state();

    let shouldSkip = writable(false);

    const cursoredSettingsDefault = {
        enabled: false,
        cursor: null,
        removeCursorWhenFinish: true,
    } satisfies CursoredSettings;
    const skippableSettingsDefault = {
        enabled: false,
        skippablePlugins: [time(100)],
    } satisfies SkippableSettings;

    let cursoredSettings: CursoredSettings = defaultsDeep(
        cursoredSettingsGiven,
        cursoredSettingsDefault
    );
    let skippableSettings: SkippableSettings = defaultsDeep(
        skippableSettingsGiven,
        skippableSettingsDefault
    );

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        //console.log(terminalClone.childNodes);
        //let terminalChildren = terminal.children.
        //console.log(terminal.childNodes);
        let concatedPlugins = concat(
            plugins ?? (!skippableSettings.enabled ? [time(100)] : []),
            cursoredSettings.enabled && !isNil(cursorElement)
                ? cursored(cursorElement)
                : [],
            skippableSettings.enabled
                ? skippable(shouldSkip, ...skippableSettings.skippablePlugins)
                : []
        );
        //console.log(concatedPlugins);
        let typewriterInstance = (fn ?? typewriterDeep)(
            { base: terminal, output: terminalClone },
            concatedPlugins
        );
        // if (fn) {
        //     typewriterInstance = fn(
        //         { base: terminal, output: terminalClone },
        //         plugins || [time(100)]
        //     );
        // } else {
        //     typewriterInstance = typewriter(
        //         { base: terminal, output: terminalClone },
        //         plugins || [time(100)]
        //     );
        // }
        let promise = typewriterInstance.start();
        promise.then(() => {
            terminal?.remove();
            if (cursoredSettings.removeCursorWhenFinish)
                cursorElement?.remove();
        });
        //if (onfinish) promise.then(onfinish);
        //if (onerror) promise.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

{#if skippableSettings.enabled}
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
{:else}
    <span bind:this={terminalClone}></span>
{/if}

{#if cursoredSettings.enabled}
    <span bind:this={cursorElement}>
        {#if cursoredSettings.cursor}
            {@render cursoredSettings.cursor()}
        {:else}
            <span class="animate-console-blink-1s">_</span>
        {/if}
    </span>
{/if}
