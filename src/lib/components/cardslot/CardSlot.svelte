<script lang="ts">
    import { droppable } from "$lib/actions/dragdrop/droppable";
    import {
        type DragDropCallback,
        type DragDropState,
    } from "$lib/actions/dragdrop/types";
    import { globalState } from "$lib/actions/dragdrop/store.svelte.js";
    import { cardRegistry, type CardData, type CardId } from "$lib/data/cards";
    import type { CardInstance } from "$lib/components/cardboard/types";
    import type { DisplayTextsOptions, HandleDropFn } from "./types";
    import { fromStore, writable, type Writable } from "svelte/store";
    import type { Attachment } from "svelte/attachments";
    import tippy, { followCursor } from "tippy.js";
    import {
        mount,
        onMount,
        type Component,
        type ComponentProps,
    } from "svelte";
    import { browser } from "$app/environment";
    import Card from "../cardboard/Card.svelte";
    import "tippy.js/animations/scale-subtle.css";
    import { m } from "$lib/paraglide/messages";

    // interface InsertResult {
    //     valid: boolean;
    // }

    function handleDrop(state: DragDropState<CardInstance>) {
        const { draggedItem, sourceContainer, targetContainer } = state;
        if (!targetContainer || sourceContainer === targetContainer) return;

        item = draggedItem;
        // let result = oninsert(state);
        // state = result || state;
    }

    interface Props {
        texts?: DisplayTextsOptions;
        callbacks?: DragDropCallback<CardInstance>;
        item?: CardInstance | undefined;
        disabled?: boolean;
        name?: string;
        value?: string;
        group?: string;
    }

    let {
        texts = {
            empty: () => `[指针插槽: 空]`,
            filled: (item) => `[指针插槽：${item}]`,
            dragging: () => `[指针插槽: 待输入……]`,
            tooltip: () => `指针插槽：可插入任意指针`,
        },
        item = $bindable(),
        callbacks = {
            onDrop: handleDrop,
        },
        disabled = false,
        name = "card-slot",
        value = "card-slot",
        group = $bindable(),
    }: Props = $props();

    let card = $derived(item ? cardRegistry.get(item.type) : null);
    //let displayText = $state("空");
    let displayTextInactive = $derived(
        item ? texts.filled(card?.display) : texts.empty()
    );
    let displayText = $derived(
        globalState.isDragging
            ? texts.dragging(card?.display)
            : displayTextInactive
    );

    // let dummy: Element | undefined = $state();
    // let writableThing = $state(false);
    // let checked = $derived(
    //     dummy ? window.getComputedStyle(dummy).display : writableThing
    // );
    // let checked2 = $derived(dummy?.checkVisibility());
    // $effect(() => {
    //     console.log(checked, checked2);
    // });

    //let disabled = $state(false);
    function tooltip(content: string): Attachment {
        return (element) => {
            const tooltip = tippy(element, {
                content,
                theme: "console-card",
                arrow: false,
                allowHTML: true,
                followCursor: true,
                plugins: [followCursor],
                animation: "scale-subtle",
            });
            return tooltip.destroy;
        };
    }

    function componentAsHTML<T extends Component<any>>(
        component: T,
        props: ComponentProps<T>
    ): string | "" {
        if (!browser) return "";
        const elem = document.createElement("div");
        mount(component, {
            target: elem,
            props: props,
        });
        return elem.innerHTML;
    }

    let cardInsideHtml: string | "" = $derived(
        item ? componentAsHTML(Card, { instance: item }) : ""
    );
</script>

<div class="inline-grid select-none">
    {#if disabled}
        <span
            class={"-overlap relative inline pointer-events-none text-gray-400 "}
            >{displayTextInactive}
        </span>
    {:else}
        <!-- data-title={texts.tooltip()} -->
        <input
            class="-overlap peer items-center cursor-pointer appearance-none w-full h-[2em] m-0"
            type="radio"
            {name}
            {value}
            defaultChecked="true"
            aria-label={texts.tooltip()}
            data-title={texts.tooltip()}
            bind:group
            {@attach tooltip(cardInsideHtml)}
        />
        <div
            class="absolute hidden appearance-none pointer-events-none peer-checked:appearance-auto"
        ></div>
        <span
            class={"-overlap relative inline peer-checked:hidden pointer-events-none text-gray-400 "}
            >{displayTextInactive}
        </span>

        <span
            class={"-overlap hidden peer-checked:inline relative pointer-events-none text-amber-200"}
            class:opacity-50={globalState.isDragging}
            >{displayText}
        </span>

        {#if globalState.isDragging}
            <div
                class="hidden peer-checked:block"
                class:**:cursor-no-drop={globalState.invalidDrop}
            >
                <span
                    use:droppable={{
                        container: "card-slot",
                        callbacks: callbacks,
                        disabled: disabled,
                    }}
                    class:text-rose-600={globalState.invalidDrop}
                    class="fixed p-2 z-11 left-1/2 top-1/2 transform-[translateX(-50%)_translateY(-50%)] bg-black text-center animate-[console-blink_0.5s_infinite]"
                >
                    {#if globalState.invalidDrop}
                        {m.inclusive_strong_javelina_pick()}
                    {:else}
                        {m.away_tough_frog_treat()}
                    {/if}
                </span>
            </div>
        {/if}
    {/if}
</div>

<!-- <div class="bg-black text-center rounded-lg">
    <span class:opacity-50={globalState.isDragging}>[指针插槽：{status}]</span>
</div> -->

<style>
    .-overlap {
        grid-area: 1/ 1/ 2/ 2;
    }
</style>
