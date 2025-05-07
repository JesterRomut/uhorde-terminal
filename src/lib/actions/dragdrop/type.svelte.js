/**
 * @typedef {string} Container
 */

/**
 * @template {unknown} T
 *
 * @typedef {object} DragDropState
 * @property {boolean} isDragging
 * @property {T} draggedItem
 * @property {Container} sourceContainer
 * @property {?Container} targetContainer
 * @property {?HTMLElement} targetElement
 * @property {boolean} [invalidDrop]
 */

/**
 * @template {unknown} T
 *
 * @typedef {object} DragDropCallback
 * @property {(state: DragDropState<T>) => void} [onDragStart]
 * @property {(state: DragDropState<T>) => void} [onDragEnter]
 * @property {(state: DragDropState<T>) => void} [onDragLeave]
 * @property {(state: DragDropState<T>) => void} [onDragOver]
 * @property {(state: DragDropState<T>) => Promise<void> | void} [onDrop]
 * @property {(state: DragDropState<T>) => void} [onDragEnd]
 */

/**
 * @template {unknown} T
 *
 * @typedef {object} DragDropOptions
 * @property {T} [dragData]
 * @property {boolean} [disabled]
 * @property {DragDropCallback<T>} [callbacks]
 * @property {string} container
 * @property {DragDropState<T>} [globalState]
 */

/**@type {DragDropState<any>} */
export const globalState = $state({
    isDragging: false,
    draggedItem: null,
    sourceContainer: "",
    targetContainer: null,
    targetElement: null,
    invalidDrop: false,
});
