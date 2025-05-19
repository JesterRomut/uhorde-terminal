<svelte:options customElement={{ shadow: "none" }} />

<script>
    import { onMount } from "svelte";
    //import { cardboard } from "../../../routes/+layout.svelte";

    let { card } = $props();

    /**@type {Element | undefined}*/
    let anchor;

    /**
     * @type {Node | undefined}
     */
    let body;

    /**@param {MouseEvent} event */
    function handleClick(event) {
        if (!card) throw new TypeError(`expect card, got ${card}`);
        if (!body) throw new TypeError(`expect body, got ${body}`);
        //cardboard.cards.push({ type: card });

        if (!anchor?.parentElement)
            throw new TypeError(
                `expect parentElement, got ${anchor?.parentElement}`
            );
        const customEvent = new CustomEvent("story-event", {
            detail: card,
            bubbles: true,
        });
        body.dispatchEvent(customEvent);

        anchor.parentElement.classList.remove("card-collectible");
        anchor.parentElement.classList.add("card-collected");

        anchor?.parentElement?.removeEventListener("click", handleClick);
    }

    onMount(() => {
        anchor?.parentElement?.removeEventListener("click", handleClick);

        //if (!cardboard) return;

        if (!anchor) throw new TypeError(`expect anchor, got ${anchor}`);

        let { parentElement } = anchor;
        if (!parentElement)
            throw new TypeError(`expect parentElement, got ${parentElement}`);

        if (parentElement.classList.contains("card-collected")) return;

        // if (cardboard.cards.find((c) => c.type == card)) {
        //     parentElement.classList.remove("card-collectible");
        //     parentElement.classList.add("card-collected");
        //     return;
        // }

        parentElement.classList.add("card-collectible");
        parentElement.addEventListener("click", handleClick);
    });
</script>

<svelte:body bind:this={body} />

<div class="hidden" bind:this={anchor}></div>
