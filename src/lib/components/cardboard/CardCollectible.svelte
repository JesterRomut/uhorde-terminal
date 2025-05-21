<script lang="ts">
    import type { Snippet } from "svelte";
    import { onDestroy, onMount } from "svelte";
    import { on } from "svelte/events";
    import { sendStoryEvent } from "../story";

    let { children, event: eventId }: { children: Snippet; event: string } =
        $props();

    let element: Element | undefined;

    let disabled = $state(false);

    let body: Element | undefined;

    /**@param {MouseEvent} event */
    function handleClick(event: MouseEvent) {
        if (!event) throw new TypeError(`expect card, got ${event}`);
        if (!body) throw new TypeError(`expect body, got ${body}`);

        if (!element) throw new TypeError(`expect Element, got ${element}`);
        // const customEvent = new CustomEvent("story-event", {
        //     detail: eventId,
        //     bubbles: true,
        // });
        // body.dispatchEvent(customEvent);
        sendStoryEvent(body, eventId);

        disabled = true;
    }

    function handleStoryEvent(event: Event) {
        if (!(event instanceof CustomEvent)) return;
        if (event.detail == event) disabled = true;
    }

    let removeStoryEventListener: () => void;

    onMount(() => {
        if (!body) throw new TypeError(`expect body, got ${body}`);
        removeStoryEventListener = on(body, "story-event", handleStoryEvent);
        //body?.addEventListener("story-event", handleStoryEvent);
    });
    onDestroy(() => {
        removeStoryEventListener();
        //body?.removeEventListener("story-event", handleStoryEvent);
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
