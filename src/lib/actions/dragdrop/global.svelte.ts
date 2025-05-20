import type { DragDropState } from "./types";

/**@type {import("./types").DragDropState<any>} */
export const globalState: DragDropState<any> = $state({
    isDragging: false,
    draggedItem: null,
    sourceContainer: "",
    targetContainer: null,
    targetElement: null,
    invalidDrop: false,
});
