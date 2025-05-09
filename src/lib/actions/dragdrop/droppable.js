/**
 * @template {unknown} T
 * 
 * @typedef {object} _DroppableOptions
 * @property {string[]} [interactive]
 * @property {string[] | string} [dragoverClass]
 /
 /** 
 * 
 * @typedef {import("./type.svelte.js").DragDropOptions<any> & _DroppableOptions<any>} DroppableOptions
 */

import { globalState } from "./type.svelte.js";

/**
 * Credit: https://github.com/thisuxhq/sveltednd
 * I love you
 *
 * @type {import("svelte/action").Action<Element, DroppableOptions<T>>}
 * @template {unknown} T
 * @param {HTMLElement} node
 * @param {DroppableOptions<T>} options
 */
export function droppable(node, options) {
    let dragEnterCounter = 0;

    let state = options.globalState || globalState;

    /**@param {DragEvent} event  */
    function handleDragEnter(event) {
        if (options.disabled) return;
        event.preventDefault();

        dragEnterCounter++;

        state.targetContainer = options.container;
        state.targetElement = /**@type {HTMLElement}*/ (event.target);

        if (dragEnterCounter == 0) return;

        if (options.dragoverClass) node.classList.add(...options.dragoverClass);
        options.callbacks?.onDragEnter?.(state);
    }

    /**@param {DragEvent} event  */
    function handleDragLeave(event) {
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
    function handleDragOver(event) {
        if (options.disabled) return;
        event.preventDefault();

        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
        //node.innerHTML = `${JSON.stringify(state.draggedItem)}`;

        options.callbacks?.onDragOver?.(state);
    }
    /**@param {DragEvent} event  */
    function handleDrop(event) {
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
    function handleDragStartOnContainer(event) {
        if (options.disabled) return;

        dragEnterCounter = 0;
        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);
    }

    /**@param {PointerEvent} event */
    function handlePointerOver(event) {
        if (options.disabled || !state.isDragging) return;

        state.targetContainer = options.container;
        if (options.dragoverClass) node.classList.add(...options.dragoverClass);
    }

    /**@param {PointerEvent} event */
    function handlePointerOut(event) {
        if (options.disabled || !state.isDragging) return;

        if (state.targetContainer === options.container)
            state.targetContainer = null;

        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);

        options.callbacks?.onDragLeave?.(state);
    }
    /**@param {PointerEvent} event */
    function handlePointerUp(event) {
        if (options.disabled || !state.isDragging) return;

        if (options.dragoverClass)
            node.classList.remove(...options.dragoverClass);

        options.callbacks?.onDrop?.(state);
    }

    // /**@param {TouchEvent} event */
    // function handleTouchStart(event) {}

    // /**@param {TouchEvent} event */
    // function handleTouchEnd(event) {}

    node.addEventListener("dragenter", handleDragEnter);
    node.addEventListener("dragleave", handleDragLeave);
    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("drop", handleDrop);
    node.addEventListener("dragstart-on-container", handleDragStartOnContainer);

    node.addEventListener("pointerover", handlePointerOver);
    node.addEventListener("pointerout", handlePointerOut);
    node.addEventListener("pointerup", handlePointerUp);

    return {
        /**@param {DroppableOptions<T>} newOptions  */
        update(newOptions) {
            options = newOptions;
        },
        destroy() {
            node.removeEventListener("dragenter", handleDragEnter);
            node.removeEventListener("dragleave", handleDragLeave);
            node.removeEventListener("dragover", handleDragOver);
            node.removeEventListener("drop", handleDrop);
            node.removeEventListener(
                "dragstart-on-container",
                handleDragStartOnContainer
            );

            node.removeEventListener("pointerover", handlePointerOver);
            node.removeEventListener("pointerout", handlePointerOut);
            node.removeEventListener("pointerup", handlePointerUp);
        },
    };
}
