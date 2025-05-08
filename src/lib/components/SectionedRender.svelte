<script module>
    /**
     * @typedef SectionedRenderState
     * @property {number} index
     */

    /**
     * @typedef {(state: SectionedRenderState, index: number) => boolean} ShowConditionFn
     */

    /**
     * @typedef Section
     * @property {import("svelte").Snippet<[]>} [content]
     * @property {ShowConditionFn} [show]
     * @property {import("svelte").Snippet<[SectionedRenderState, number, import("svelte").Snippet<any>|undefined]>} wrapper
     */
</script>

<script>
    /**
     * @typedef {object} Prop
     *
     * @property {SectionedRenderState} state
     * @property {object} [options]
     * @property {Section[]} sections
     */
    /**@type {Prop}*/
    let { state = $bindable(), sections } = $props();
</script>

{#each sections as s, i}
    {#if s.show?.(state, i)}
        {@render s.wrapper(state, i, s.content)}
    {/if}
{/each}
