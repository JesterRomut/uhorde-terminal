import { on } from "svelte/events";

export function sendStoryEvent<T = string>(
    body: Element | undefined,
    detail: T
): void {
    if (!body) throw new TypeError(`expect body, got ${body}`);

    const customEvent = new CustomEvent("uhorde-story-event", {
        detail: detail,
        bubbles: true,
    });
    body.dispatchEvent(customEvent);
}

/**
 * 返回去掉Listener的函数
 */
export function receiveStoryEvent(
    body: Element | undefined,
    callback: EventListener
) {
    if (!body) throw new TypeError(`expect body, got ${body}`);
    return on(body, "uhorde-story-event", callback);
}
