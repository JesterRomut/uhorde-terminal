<script>
    /**
     * @type {{choices: {text:string, href?: string, onclick?: import("svelte/elements").MouseEventHandler<HTMLAnchorElement>}[]}}
     */
    let { choices } = $props();

    // /**
    //  * @type {import("svelte/elements").MouseEventHandler<HTMLAnchorElement>}
    //  */
    // function trigger(element) {}
    // /**
    //  * @type {import("svelte/elements").FocusEventHandler<HTMLAnchorElement>}
    //  */
    // const triggerFocus = (element) => {};
</script>

{#each choices as choice}
    <a
        class="block"
        href={choice.href ? choice.href : "/"}
        onclick={choice.onclick}>{choice.text}</a
    >
{/each}

<style>
    a::before {
        content: "> ";
    }

    a:hover {
        color: #faf0c3;
    }
    a:hover::before {
        content: "$ ";
    }
</style>
