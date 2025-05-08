<script module>
    export { content };

    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";
    // @ts-ignore
    import section0 from "./section0.md";
    // @ts-ignore
    import section1 from "./section1.md";
</script>

{#snippet sectionWrapper(
    /**@type {import("svelte").Snippet}*/ section,
    /**@type {() => void}*/ onfinish
)}
    <TypewriterMoverCursored
        removeCursorWhenFinish={false}
        time={100}
        {onfinish}
    >
        {@render section()}
    </TypewriterMoverCursored>
{/snippet}

{#snippet content()}
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <!-- {#if stage == 1}
        <TerminalChoice
            choices={[
                // {
                //     text: "[下一页 / NEXT PAGE]",
                //     waitingTime: 1000,
                //     onclick: (e) => {
                //         goto("/");
                //     },
                // },
                {
                    text: "[继续 / CONTINUE]",
                    waitingTime: 1000,
                    onclick: (e) => {
                        stage = 2;
                    },
                },
            ]}
        />
    {/if}
    {#if stage > 1}
        <TypewriterMoverCursored
            removeCursorWhenFinish={false}
            time={100}
            onfinish={() => {
                new Promise((fulfil) => {
                    setTimeout(fulfil, 500);
                }).then(() => {
                    stage = 3;
                });
            }}
            onappend={[
                () => {
                    //terminal().scroll(0, 1000);
                },
            ]}
        >
            {@render page1()}
        </TypewriterMoverCursored>
    {/if} -->
{/snippet}
