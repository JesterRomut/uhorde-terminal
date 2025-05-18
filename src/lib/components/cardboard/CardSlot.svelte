<svelte:options customElement={{ tag: "card-slot", shadow: "none" }} />

<script lang="ts">
    import { droppable } from "$lib/actions/dragdrop/droppable";
    import {
        globalState,
        type DragDropState,
    } from "$lib/actions/dragdrop/type.svelte";
    import { cardRegistry } from "$lib/data/cards";
    import type { CardInstance } from "$lib/types/card";
    import { onMount } from "svelte";

    interface InsertResult {
        valid: boolean;
    }

    function handleDrop(state: DragDropState<CardInstance>) {
        const { draggedItem, sourceContainer, targetContainer } = state;
        if (!targetContainer || sourceContainer === targetContainer) return;

        displayText = cardRegistry.get(draggedItem.type).display;
        let result = oninsert(draggedItem);
        if (!result.valid) {
            state.invalidDrop = true;
            return;
        }
        disabled = true;
    }

    interface Props {
        title?: string;
        oninsert: (card: CardInstance) => InsertResult;
    }

    let { title = "指针插槽", oninsert }: Props = $props();

    let displayText = $state("空");
    let status = $derived(globalState.isDragging ? "待输入……" : displayText);

    let disabled = $state(false);
</script>

<div class="grid select-none">
    {#if disabled}
        <span
            class={"-overlap relative inline peer-checked:hidden pointer-events-none text-gray-400 "}
            >[{title}: {displayText}]
        </span>
    {:else}
        <input
            class="-overlap peer items-center cursor-pointer appearance-none bg-black w-full h-[2em] m-0"
            type="radio"
            name="card-slot"
            defaultChecked="true"
        />
        <span
            class={"-overlap relative inline peer-checked:hidden pointer-events-none text-gray-400 "}
            >[{title}: {displayText}]
        </span>

        <span
            class={"-overlap hidden peer-checked:inline relative pointer-events-none text-amber-200"}
            class:opacity-50={globalState.isDragging}
            >[{title}: {status}]
        </span>

        {#if globalState.isDragging}
            <div class="hidden peer-checked:block">
                <span
                    use:droppable={{
                        container: "card-slot",
                        callbacks: { onDrop: handleDrop },
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
