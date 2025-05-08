<script>
    import Card from "./Card.svelte";

    /**
     * @typedef {object} Props
     * @property {import("./Card.svelte").CardInstance[]} cards
     * */

    /**@type {Props}*/
    let { cards = $bindable() } = $props();

    const range = 60;

    let hover = $state(false);
</script>

<div
    role="none"
    onmouseover={() => (hover = true)}
    onmouseout={() => (hover = false)}
    onfocus={() => (hover = true)}
    onblur={() => (hover = false)}
    class="md:-bottom-6rem -cardboard fixed bottom-0 flex justify-center items-center"
>
    {#each cards as card, index}
        <Card
            instance={card}
            bind:mouseOnList={hover}
            --card-rotation={(range / cards.length) * index - range / 2}
        />
    {/each}
</div>

<style>
    .-cardboard {
        bottom: -8rem;
        transition: 0.5s;
        width: 100%;
    }
    @media only screen and (max-width: 600px) {
        .-cardboard {
            bottom: -4rem;
        }
    }
    .-cardboard:hover {
        bottom: 0;
    }
</style>
