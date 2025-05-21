<script module>
    export { title, background, category };

    export const display = "#52 (Uhrwerk)";
</script>

<script>
    import UhrwerkPic from "$lib/assets/cards/characters/uhrwerk.png?enhanced";
    import { m } from "$lib/paraglide/messages";
</script>

{#snippet title()}
    <span class="block bg-black">{m.equal_lime_camel_pet()}</span>
{/snippet}
{#snippet category()}
    <span class="inline-block relative px-3 bottom-3 bg-black"
        >{m.candid_happy_goose_swim()}</span
    >
{/snippet}

{#snippet background()}
    <enhanced:img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={UhrwerkPic}
        alt={display}
    ></enhanced:img>
{/snippet}
