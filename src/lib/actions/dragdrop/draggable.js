import { globalState } from "./type.svelte.js";

/**
 * @template {unknown} T
 * 
 * @typedef {object} _DraggableOptions
 * @property {string[]} [interactive]
 * @property {{isDragging: boolean}} ref
 /
 /** 
 * 
 * @typedef {import("./type.svelte.js").DragDropOptions<any> & _DraggableOptions<any>} DraggableOptions
 */

const isEventSupported = (function () {
    let TAGNAMES = {
        select: "input",
        change: "input",
        submit: "form",
        reset: "form",
        error: "img",
        load: "img",
        abort: "img",
    };
    /**
     * @param {string} eventName
     */
    function isEventSupported(eventName) {
        // @ts-ignore
        let el = document.createElement(TAGNAMES[eventName] || "div");
        eventName = "on" + eventName;
        let isSupported = eventName in el;
        if (!isSupported) {
            el.setAttribute(eventName, "return;");
            isSupported = typeof el[eventName] == "function";
        }
        el = null;
        return isSupported;
    }
    return isEventSupported;
})();
/**
 * Credit: https://github.com/thisuxhq/sveltednd
 * I love you
 *
 * @type {import("svelte/action").Action<Element, DraggableOptions<T>>}
 * @template {unknown} T
 * @param {HTMLElement} node
 * @param {DraggableOptions<T>} options
 */
export function draggable(node, options) {
    let oldStylePos = node.style.position;

    let /**@type {number}*/ initialX, /**@type {number}*/ initialY;

    let state = options.globalState || globalState;

    options.ref.isDragging = false;

    let dragSupported = () => isEventSupported("dragstart");

    /**
     *
     * @param {HTMLElement} target
     * @returns {boolean}
     */
    function isInteractiveElement(target) {
        if (!options.interactive) return false;

        return options.interactive.some(
            (selector) => target.matches(selector) || target.closest(selector)
        );
    }

    /** @param {DragEvent} event  */
    function handleDragStart(event) {
        if (options.disabled) return;

        state.isDragging = true;
        state.draggedItem = options.dragData;
        state.sourceContainer = options.container;
        state.targetContainer = null;

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData(
                "text/plain",
                JSON.stringify(options.dragData)
            );
        }

        //if (options.draggingClass) node.classList.add(...options.draggingClass);
        options.ref.isDragging = true;

        options.callbacks?.onDragStart?.(state);

        // **Dispatch the custom event that bubbles up to the container**
        const customEvent = new CustomEvent("dragstart-on-container", {
            bubbles: true,
        });
        node.dispatchEvent(customEvent);
    }

    function handleDragEnd() {
        //if (options.draggingClass)
        //    node.classList.remove(...options.draggingClass);
        options.ref.isDragging = false;

        options.callbacks?.onDragEnd?.(state);

        //reset state
        state.isDragging = false;
        state.draggedItem = null;
        state.sourceContainer = "";
        state.targetContainer = null;
    }

    /**@param {PointerEvent} event  */
    function handlePointerDown(event) {
        if (options.disabled) return;

        if (isInteractiveElement(/** @type {HTMLElement} */ (event.target)))
            return;

        initialX = event.clientX;
        initialY = event.clientY;

        state.isDragging = true;
        state.draggedItem = options.dragData;
        state.sourceContainer = options.container;
        state.targetContainer = null;

        node.setPointerCapture(event.pointerId);

        //if (options.draggingClass) node.classList.add(...options.draggingClass);
        options.ref.isDragging = true;

        options.callbacks?.onDragStart?.(state);
    }

    /**@param {PointerEvent} event  */
    function handlePointerMove(event) {
        if (!state.isDragging) return;
    }

    /**@param {PointerEvent} event  */
    function handlePointerUp(event) {
        if (!state.isDragging) return;

        node.releasePointerCapture(event.pointerId);
        // if (options.draggingClass)
        //     node.classList.remove(...options.draggingClass);
        options.ref.isDragging = false;

        options.callbacks?.onDragEnd?.(state);

        state.isDragging = false;
        state.draggedItem = null;
        state.sourceContainer = "";
        state.targetContainer = null;
    }

    // /**@param {TouchEvent} event */
    // function handleTouchStart(event) {
    //     let touchLocation = event.targetTouches[0];

    //     initialX = touchLocation.clientX;
    //     initialY = touchLocation.clientY;

    //     options.ref.isDragging = true;

    //     state.isDragging = true;
    //     state.draggedItem = options.dragData;
    //     state.sourceContainer = options.container;
    //     state.targetContainer = null;
    // }

    // /**@param {TouchEvent} event */
    // function handleTouchMove(event) {
    //     if (!state.isDragging) return;

    //     let touchLocation = event.targetTouches[0];

    //     //oldStylePos = node.style.position;
    //     // node.style.position = "fixed";
    //     // node.style.left = touchLocation.clientX + "px";
    //     // node.style.top = touchLocation.clientY + "px";
    // }

    // /**@param {TouchEvent} event */
    // function handleTouchEnd(event) {
    //     console.log(event);
    //     node.style.position = oldStylePos;
    //     node.style.left = "auto";
    //     node.style.top = "auto";

    //     options.ref.isDragging = false;

    //     state.isDragging = false;
    //     state.draggedItem = null;
    //     state.sourceContainer = "";
    //     state.targetContainer = null;
    // }

    node.draggable = !options.disabled;
    node.addEventListener("dragstart", handleDragStart);
    node.addEventListener("dragend", handleDragEnd);
    node.addEventListener("pointerdown", handlePointerDown);
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerup", handlePointerUp);
    // node.addEventListener("touchstart", handleTouchStart);
    // node.addEventListener("touchmove", handleTouchMove);
    // node.addEventListener("touchend", handleTouchEnd);

    return {
        /**@param {DraggableOptions<T>} newOptions  */
        update(newOptions) {
            options = newOptions;
            node.draggable = !options.disabled;
        },

        destroy() {
            node.removeEventListener("dragstart", handleDragStart);
            node.removeEventListener("dragend", handleDragEnd);
            node.removeEventListener("pointerdown", handlePointerDown);
            node.removeEventListener("pointermove", handlePointerMove);
            node.removeEventListener("pointerup", handlePointerUp);
            // node.removeEventListener("touchstart", handleTouchStart);
            // node.removeEventListener("touchmove", handleTouchMove);
            // node.removeEventListener("touchend", handleTouchEnd);
        },
    };
}
