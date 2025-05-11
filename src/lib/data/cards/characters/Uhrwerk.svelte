<script module>
    export { title, background, category };

    export const display = "#52 (Uhrwerk)";
</script>

<script>
    import UhrwerkPic from "$lib/assets/cards/characters/uhrwerk.png?enhanced";
</script>

{#snippet title()}
    <span class="block bg-black">钨尔维克</span>
{/snippet}
{#snippet category()}
    <span class="inline-block relative px-3 bottom-3 bg-black">实体</span>
{/snippet}

{#snippet background()}
    <enhanced:img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={UhrwerkPic}
        alt={display}
    ></enhanced:img>
{/snippet}
