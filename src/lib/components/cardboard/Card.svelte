<script module>
    /**
     * @typedef {object} CardInstance
     * @property {string} type
     */
</script>

<script>
    import { draggable } from "$lib/actions/dragdrop/draggable";
    import { globalState } from "$lib/actions/dragdrop/type.svelte";
    import { cardRegistry } from "$lib/data/registries/cardRegistry";
    import { fly } from "svelte/transition";

    /**@typedef {object} Props
     * @property {boolean} [mouseOnList]
     * @property {boolean} [disabled]
     * @property {CardInstance} instance
     */
    /**@type {Props}*/
    let {
        instance,
        mouseOnList = $bindable(true),
        disabled = $bindable(false),
    } = $props();

    let localDragState = $state({ isDragging: false });
</script>

<div
    class="-card w-[20vw] max-w-[10rem] aspect-[1/1.4]
     relative transform-[rotate(calc(var(--card-rotation)_*_1deg))]
      bg-[image:linear-gradient(#fff2,_transparent)]
      border-solid border-gray-950/75 border-[1px] shadow-md shadow-gray-950/25
      backdrop-blur-md grid justify-center items-center rounded-lg m-[0_-6vw] md:m-[0_-45px]
      hover:transform-[rotate(0)] hover:cursor-grab hover:border-gray-300/75 overflow-hidden"
    class:-cardboard-hovering={mouseOnList}
    class:-card-dragging={localDragState.isDragging}
    class:-card-dragging-unselected={globalState.isDragging &&
        !localDragState.isDragging}
    use:draggable={{
        container: "cardboard",
        dragData: instance,
        ref: localDragState,
    }}
    transition:fly={{ y: -200 }}
>
    <div class="pointer-events-none">
        {@render cardRegistry.getCard(instance.type).background()}
    </div>

    <div
        class="w-full text-center absolute top-0 left-1/2 transform-[translateX(-50%)] overflow-hidden overflow-ellipsis whitespace-nowrap"
    >
        {@render cardRegistry.getCard(instance.type).title?.()}
    </div>

    <div
        class="w-full text-center absolute bottom-0 left-1/2 transform-[translateX(-50%)] whitespace-nowrap hidden md:block"
    >
        {@render cardRegistry.getCard(instance.type).category?.()}
    </div>
</div>

<style>
    .-card div {
        grid-area: 1/ 1/ 2/ 2;
    }

    .-card {
        transition: 0.5s;
    }

    .-cardboard-hovering {
        margin: 0;
    }
    .-card-dragging {
        bottom: 1rem;
    }
    .-card-dragging:hover {
        transform: scale(1.2);
        z-index: 10;
        cursor: grabbing;
    }
    .-card-dragging-unselected {
        pointer-events: none;
        opacity: 60%;
        bottom: -4rem;
        z-index: 0;
    }
</style>
