interface _DroppableOptions<T> {
    interactive?: string[];
    dragoverClass?: string[] | string;
}

type DroppableOptions<T> = DragDropOptions<T> & _DroppableOptions<T>;

import type { ActionReturn } from "svelte/action";
import { globalState } from "./store.svelte.js";
import type { DragDropOptions } from "./types.js";
import { fromStore } from "svelte/store";
import { on } from "svelte/events";

/**
 * Credit: https://github.com/thisuxhq/sveltednd
 * I love you
 *
 */
export function droppable<T>(
    node: HTMLElement,
    options: DroppableOptions<T>
): ActionReturn<DroppableOptions<T>> {
    let dragEnterCounter = 0;

    let state = options.globalState || globalState;

    /**@param {DragEvent} event  */
    function handleDragEnter(event: DragEvent) {
        if (options.disabled) return;
        event.preventDefault();

        dragEnterCounter++;

        state.targetContainer = options.container;
        state.targetElement = event.target as HTMLElement;

        if (dragEnterCounter == 0) return;

        if (options.dragoverClass) node.classList.add(...options.dragoverClass);
        options.callbacks?.onDragEnter?.(state);
    }

    /**@param {DragEvent} event  */
    function handleDragLeave(event: DragEvent) {
        if (options.disabled) return;

        dragEnterCounter--;

        if (dragEnterCounter > 0) return;

        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);

        options.callbacks?.onDragLeave?.(state);

        if (
            state.targetContainer === options.container &&
            state.targetElement === event.target
        ) {
            state.targetContainer = null;
            state.targetElement = null;
        }
    }

    /**@param {DragEvent} event  */
    function handleDragOver(event: DragEvent) {
        if (options.disabled) return;
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
        //node.innerHTML = `${JSON.stringify(state.draggedItem)}`;

        options.callbacks?.onDragOver?.(state);
    }
    /**@param {DragEvent} event  */
    function handleDrop(event: DragEvent) {
        if (options.disabled) return;
        event.preventDefault();

        dragEnterCounter = 0;
        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);

        if (event.dataTransfer) {
            const dragData = JSON.parse(
                event.dataTransfer.getData("text/plain")
            );
            state.draggedItem = dragData;
        }

        options.callbacks?.onDrop?.(state);
    }

    /**@param {Event} event  */
    function handleDragStartOnContainer(event: Event) {
        if (options.disabled) return;

        dragEnterCounter = 0;
        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);
    }

    /**@param {PointerEvent} event */
    function handlePointerOver(event: PointerEvent) {
        if (options.disabled || !state.isDragging) return;

        state.targetContainer = options.container;
        if (options.dragoverClass) node.classList.add(...options.dragoverClass);
    }

    /**@param {PointerEvent} event */
    function handlePointerOut(event: PointerEvent) {
        if (options.disabled || !state.isDragging) return;

        if (state.targetContainer === options.container)
            state.targetContainer = null;

        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);

        options.callbacks?.onDragLeave?.(state);
    }
    /**@param {PointerEvent} event */
    function handlePointerUp(event: PointerEvent) {
        if (options.disabled || !state.isDragging) return;

        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);

        options.callbacks?.onDrop?.(state);
    }

    // /**@param {TouchEvent} event */
    // function handleTouchStart(event) {}

    // /**@param {TouchEvent} event */
    // function handleTouchEnd(event) {}
    const removeDragEnter = on(node, "dragenter", handleDragEnter);
    const removeDragLeave = on(node, "dragleave", handleDragLeave);
    const removeDragOver = on(node, "dragover", handleDragOver);
    const removeDrop = on(node, "drop", handleDrop);
    const removeDragStartOnContainer = on(
        node,
        "dragstart-on-container",
        handleDragStartOnContainer
    );

    // const removePointerOver = on(node, "pointerover", handlePointerOver);
    // const removePointerOut = on(node, "pointerout", handlePointerOut);
    // const removePointerUp = on(node, "pointerup", handlePointerUp);
    // node.addEventListener("dragenter", handleDragEnter);
    // node.addEventListener("dragleave", handleDragLeave);
    // node.addEventListener("dragover", handleDragOver);
    // node.addEventListener("drop", handleDrop);
    // node.addEventListener("dragstart-on-container", handleDragStartOnContainer);

    // node.addEventListener("pointerover", handlePointerOver);
    // node.addEventListener("pointerout", handlePointerOut);
    // node.addEventListener("pointerup", handlePointerUp);

    return {
        /**@param {DroppableOptions<T>} newOptions  */
        update(newOptions: DroppableOptions<T>) {
            options = newOptions;
        },
        destroy() {
            removeDragEnter();
            removeDragLeave();
            removeDragOver();
            removeDrop();
            removeDragStartOnContainer();

            // removePointerOver();
            // removePointerOut();
            // removePointerUp();
        },
    };
}
