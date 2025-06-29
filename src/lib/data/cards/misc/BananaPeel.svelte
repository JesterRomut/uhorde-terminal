<script module>
    export { title, background, category };

    export const display = "香蕉皮";
</script>

<script>
    import Background from "$lib/assets/cards/banana_peel.png?enhanced";
    import { m } from "$lib/paraglide/messages";
</script>

{#snippet title()}
    <span class="block bg-black">香蕉皮</span>
{/snippet}
{#snippet category()}
    <!-- <span class="inline-block relative px-3 bottom-3 bg-black"
        >{m.candid_happy_goose_swim()}</span
    > -->
{/snippet}

{#snippet background()}
    <enhanced:img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={Background}
        alt={display}
    ></enhanced:img>
{/snippet}
