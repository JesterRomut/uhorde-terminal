export class CustomElementUtil {
    // /**
    //  * use in onMount
    //  * @param {CustomElementRegistry} customElements
    //  * @param {string} name
    //  * @param {CustomElementConstructor | undefined} constructor
    //  * @param {ElementDefinitionOptions} [options]
    //  */
    // static defineCustomElement(customElements, name, constructor, options) {
    //     if (customElements.get(name)) return;
    //     if (!constructor) throw TypeError(`Can't build ${name}!`);
    //     customElements.define("logos-logo", constructor, options);
    // }
    /**
     * use in onMount
     * @param {string} name
     * @param {CustomElementConstructor | undefined} constructor
     * @param {ElementDefinitionOptions} [options]
     *
     */
    static define(name, constructor, options) {
        if (customElements.get(name)) return;
        if (!constructor) throw TypeError(`Can't build ${name}!`);
        customElements.define("logos-logo", constructor, options);
    }
}
