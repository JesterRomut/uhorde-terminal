export type TypewriterResult = { start: () => Promise<void> };

//export type TypewriterCallback = (node: Node) => void;

export type TypewriterCallback<T extends Function> = T | T[];

export interface TypewriterCallbacks {
    postappend: TypewriterCallback<
        (node: Node, output: Element) => void | Promise<void>
    >;
    onfinish: TypewriterCallback<(output: Element) => void | Promise<void>>;
}

export type TypewriterFn = (
    base: Element,
    output: Element,
    //time: number,
    callbacks: Partial<TypewriterCallbacks>
    //onappend?: ((node: Node) => void)[]
) => TypewriterResult;

export type TypewriterBuilderFn = (
    param: TypewriterParams,
    plugins?: TypewriterPlugin[]
) => TypewriterResult;

export interface TypewriterParams {
    base: Element;
    output: Element;
    //time: number;
}
export type TypewriterPlugin = () => Partial<TypewriterCallbacks>;
// export type TypewriterCursoredFn = (
//     base: Element,
//     output: Element,
//     time: number,
//     cursor: Element,
//     //onappend?: ((node: Node) => void)[]
// ) => TypewriterResult;
