export type TypewriterResult = { start: () => Promise<void> };

export type TypewriterFn = (
    base: Element,
    output: Element,
    time: number,
    onappend?: ((node: Node) => void)[]
) => TypewriterResult;

export type TypewriterCursoredFn = (
    base: Element,
    output: Element,
    time: number,
    cursor: Element,
    onappend?: ((node: Node) => void)[]
) => TypewriterResult;
