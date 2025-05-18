import type { CardId } from "../data/cards";

// const CardActions = {
//     OBTAIN: "obtain",
//     REPLACE: "replace",
// };
export enum CardActions {
    OBTAIN = "obtain",
    REPLACE = "replace",
}

export interface CardInstance {
    type: CardId;
}

export interface CardObtainAction {
    card: CardInstance;
    action: "obtain";
}
export interface CardReplaceAction {
    card: {
        from: CardId;
        to: CardId;
    };
    action: "replace";
}

export type CardAction = CardObtainAction | CardReplaceAction;
