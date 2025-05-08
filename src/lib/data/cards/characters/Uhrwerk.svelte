<script module>
    export { title, background, category };

    export const display = "a8df (Uhrwerk)";
</script>

<script>
    import UhrwerkPic from "$lib/assets/cards/characters/uhrwerk.png?enhanced";
</script>

{#snippet title()}
    <span class="block bg-black">钨尔维克</span>
{/snippet}
{#snippet category()}
    <span class="block bg-black">实体</span>
{/snippet}

{#snippet background()}
    <enhanced:img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={UhrwerkPic}
        alt=""
    ></enhanced:img>
{/snippet}
