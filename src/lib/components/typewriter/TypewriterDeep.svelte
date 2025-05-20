<script lang="ts">
    import { onMount } from "svelte";
    import { typewriterDeep } from ".";

    interface Props {
        onfinish?: () => void;
        onerror?: (reason: any) => void;
        time?: number;
        children: any;
    }

    let { children, time = 200, onfinish, onerror }: Props = $props();

    let terminal: Element | undefined;

    let terminalClone: Element | undefined;

    onMount(() => {
        if (!terminal) throw TypeError("terminal not bound!");
        if (!terminalClone) throw TypeError("terminalClone not bound!");
        //console.log(terminalClone.childNodes);
        //let terminalChildren = terminal.children.
        //console.log(terminal.childNodes);
        let typer = typewriterDeep(terminal, terminalClone, time).start();
        typer.then(() => {
            terminal?.remove();
        });
        if (onfinish) typer.then(onfinish);
        if (onerror) typer.catch(onerror);
    });
</script>

<span bind:this={terminal} class="hidden">
    {@render children()}
</span>

<span bind:this={terminalClone}></span>
