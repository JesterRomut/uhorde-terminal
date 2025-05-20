<script lang="ts">
    import { droppable } from "$lib/actions/dragdrop/droppable";
    import {
        type DragDropCallback,
        type DragDropState,
    } from "$lib/actions/dragdrop/types";
    import { globalState } from "$lib/actions/dragdrop/global.svelte.js";
    import { cardRegistry, type CardData, type CardId } from "$lib/data/cards";
    import type { CardInstance } from "$lib/components/cardboard/types";
    import type { DisplayTextsOptions, HandleDropFn } from "./types";

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
        disabled = $bindable(false),
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

    //let disabled = $state(false);
</script>

<div class="inline-grid select-none">
    {#if disabled}
        <span
            class={"-overlap relative inline peer-checked:hidden pointer-events-none text-gray-400 "}
            >{displayTextInactive}
        </span>
    {:else}
        <input
            class="-overlap peer items-center cursor-pointer appearance-none w-full h-[2em] m-0"
            type="radio"
            name="card-slot"
            defaultChecked="true"
            aria-label={texts.tooltip()}
            data-title={texts.tooltip()}
        />
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
            <div class="hidden peer-checked:block">
                <span
                    use:droppable={{
                        container: "card-slot",
                        callbacks: callbacks,
                        disabled: disabled,
                    }}
                    class="fixed p-2 z-11 left-1/2 top-1/2 transform-[translateX(-50%)_translateY(-50%)] bg-black text-center animate-[console-blink_0.5s_infinite]"
                    >-- PLACE POINTER HERE --
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
