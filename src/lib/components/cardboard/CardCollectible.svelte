<script lang="ts">
    import type { Snippet } from "svelte";
    import { onDestroy, onMount } from "svelte";

    let { children, event: eventId }: { children: Snippet; event: string } =
        $props();

    let element: Element | undefined;

    let disabled = $state(false);

    let body: Node | undefined;

    /**@param {MouseEvent} event */
    function handleClick(event: MouseEvent) {
        if (!event) throw new TypeError(`expect card, got ${event}`);
        if (!body) throw new TypeError(`expect body, got ${body}`);

        if (!element) throw new TypeError(`expect Element, got ${element}`);
        const customEvent = new CustomEvent("story-event", {
            detail: eventId,
            bubbles: true,
        });
        body.dispatchEvent(customEvent);

        disabled = true;
    }

    function handleStoryEvent(event: Event) {
        if (!(event instanceof CustomEvent)) return;
        if (event.detail == event) disabled = true;
    }

    onMount(() => {
        body?.addEventListener("story-event", handleStoryEvent);
    });
    onDestroy(() => {
        body?.removeEventListener("story-event", handleStoryEvent);
    });
</script>

<svelte:body bind:this={body} />

<!-- svelte-ignore a11y_invalid_attribute -->
<a
    href="javascript:;"
    bind:this={element}
    class:card-collectible={!disabled}
    class:card-collected={disabled}
    onclick={handleClick}>{@render children()}</a
>
