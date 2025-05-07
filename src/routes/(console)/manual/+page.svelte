<script>
    import TerminalChoice from "$lib/components/TerminalChoice.svelte";
    import TypewriterMover from "$lib/components/typewriter/TypewriterMover.svelte";
    import Loader from "$lib/components/Loader.svelte";

    import { goto } from "$app/navigation";

    // @ts-ignore
    import page0 from "./page0.md";
    // @ts-ignore
    import page1 from "./page1.md";

    import TypewriterMoverCursored from "$lib/components/typewriter/TypewriterMoverCursored.svelte";

    //let finished = $state(false);
    let stage = $state(0);

    const pages = [page0, page1];
</script>

<Loader>
    <TypewriterMoverCursored
        removeCursorWhenFinish={false}
        time={100}
        onfinish={() => {
            new Promise((fulfil) => {
                setTimeout(fulfil, 500);
            }).then(() => {
                stage = 1;
            });
        }}
    >
        {@render page0()}
    </TypewriterMoverCursored>
    {#if stage == 1}
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
    {/if}
</Loader>
