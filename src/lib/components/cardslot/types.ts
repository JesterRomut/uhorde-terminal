import type { DragDropState } from "$lib/actions/dragdrop/types";
import type { CardInstance } from "../cardboard/types";

export type DisplayTextFn = (item?: string) => string;

export interface DisplayTextsOptions {
    empty: DisplayTextFn;
    filled: DisplayTextFn;
    dragging: DisplayTextFn;
    tooltip: DisplayTextFn;
}

export type HandleDropFn = (
    state: DragDropState<CardInstance>
) => DragDropState<any> | undefined | null | void;
