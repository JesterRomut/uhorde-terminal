export class CustomElementUtils {
    /**
     * use in onMount
     */
    static define(
        name: string,
        constructor: CustomElementConstructor | undefined,
        options?: ElementDefinitionOptions
    ) {
        if (customElements.get(name)) return;
        if (!constructor) throw TypeError(`Can't build ${name}!`);
        customElements.define(name, constructor, options);
    }
}

export class StringUtils {
    format(format: string) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    }
}
