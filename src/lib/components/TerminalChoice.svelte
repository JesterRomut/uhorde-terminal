<script>
    /**
     * @typedef {Object} Choice
     * @property {import("svelte/elements").MouseEventHandler<HTMLAnchorElement>} [onclick]
     * @property {string} [href]
     * @property {number} [waitingTime]
     * @property {string} text
     */
    /**
     *
     * @type {{choices: Choice[]}}
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
    /**
     *
     * @param {Choice} choice
     */
    //function onClick(choice) {}
</script>

{#each choices as choice}
    <a
        class="block"
        href={choice.href ? choice.href : "/"}
        onclick={(event) => {
            if (!choice.onclick) return;

            let { target } = event;
            if (target instanceof Element) {
                target.classList.add("animate-console-blink", "text-[#faf0c3]");
            }

            if (choice.waitingTime) {
                new Promise((fulfil) => {
                    setTimeout(fulfil, choice.waitingTime);
                }).then(() => {
                    if (!choice.onclick) return;
                    choice.onclick(event);
                });
                return;
            }
            choice.onclick(event);
        }}
    >
        {choice.text}
    </a>
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
