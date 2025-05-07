<script>
    import { droppable } from "$lib/actions/dragdrop/droppable";
    import { globalState } from "$lib/actions/dragdrop/type.svelte";

    /**@param {import("$lib/actions/dragdrop/type.svelte").DragDropState<any>} state */
    function handleDrop(state) {
        const { draggedItem, sourceContainer, targetContainer } = state;
        if (!targetContainer || sourceContainer === targetContainer) return;

        displayText = draggedItem;
    }

    let displayText = $state("空");
    let status = $derived(globalState.isDragging ? "待输入……" : displayText);
</script>

<div class="bg-black text-center rounded-lg">
    <span class:opacity-50={globalState.isDragging}>[指针插槽：{status}]</span>
</div>
{#if globalState.isDragging}
    <span
        use:droppable={{
            container: "card-slot",
            callbacks: { onDrop: handleDrop },
        }}
        class="fixed p-2 z-11 left-1/2 top-1/2 transform-[translateX(-50%)_translateY(-50%)] bg-black text-center animate-[console-blink_0.5s_infinite]"
        >-- PLACE POINTER HERE --
    </span>
{/if}

<style>
</style>
