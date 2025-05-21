import type { DragDropState } from "./types";

export const globalState: DragDropState<any> = $state({
    isDragging: false,
    draggedItem: null,
    sourceContainer: "",
    targetContainer: null,
    targetElement: null,
    invalidDrop: false,
});
