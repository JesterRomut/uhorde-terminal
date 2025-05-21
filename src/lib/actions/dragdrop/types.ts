import type { Writable } from "svelte/store";

export type Container = string;

export interface DragDropState<T> {
    isDragging: boolean;
    draggedItem: T;
    sourceContainer: Container;
    targetContainer?: Container | null;
    targetElement?: HTMLElement | null;
    invalidDrop?: boolean;
}

export interface DragDropCallback<T> {
    onDragStart?: (state: DragDropState<T>) => void;
    onDragEnter?: (state: DragDropState<T>) => void;
    onDragLeave?: (state: DragDropState<T>) => void;
    onDragOver?: (state: DragDropState<T>) => void;
    onDrop?: (state: DragDropState<T>) => Promise<void> | void;
    onDragEnd?: (state: DragDropState<T>) => void;
}

export interface DragDropOptions<T> {
    dragData?: T;
    disabled?: boolean;
    callbacks?: DragDropCallback<T>;
    container: string;
    globalState?: DragDropState<T>;
}
