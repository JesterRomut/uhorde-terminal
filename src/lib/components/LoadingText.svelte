<!-- <script>
    // const spinner = {
    //     interval: 10,
    //     frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    // };

    // let intervalId = setInterval(() => {
    //     console.log(curIndex);
    //     curIndex++;

    //     if (curIndex >= spinner.frames.length) {
    //         curIndex = 0;
    //     }
    // }, 100);
</script> -->
<script>
    let { children = null } = $props();
</script>

<span class="-spinner"></span>
{#if children}
    {@render children?.()}
{:else}
    加载中...
{/if}

<style>
    .-spinner:after {
        animation-duration: 500ms;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-name: loading-ellipsis;
        animation-timing-function: linear;
        /*
				This has to be here otherwise animation won't run in Chrome. Plus, the
				animation won't run at all in Safari (classic Safari), so this provides a
				back-up rendering for non-modern browsers.
			*/
        content: "⠋";
        display: inline-block;
    }

    @keyframes loading-ellipsis {
        0% {
            content: "⠋";
        }
        10% {
            content: "⠙";
        }
        20% {
            content: "⠹";
        }
        30% {
            content: "⠸";
        }
        40% {
            content: "⠼";
        }
        50% {
            content: "⠴";
        }
        60% {
            content: "⠦";
        }
        70% {
            content: "⠧";
        }
        80% {
            content: "⠇";
        }
        90%,
        100% {
            content: "⠏";
        }
    }
</style>
