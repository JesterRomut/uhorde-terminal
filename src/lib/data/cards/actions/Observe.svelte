<script module>
    export { title, background, category };

    export const display = "观察";
</script>

<script>
    import UhrwerkPic from "$lib/assets/cards/characters/uhrwerk.png?enhanced";
</script>

{#snippet title()}
    <span class="block bg-black">观察</span>
{/snippet}
{#snippet category()}
    <span class="inline-block relative px-3 bottom-3 bg-black">动作</span>
{/snippet}

{#snippet background()}
    <enhanced:img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={UhrwerkPic}
        alt={display}
    ></enhanced:img>
{/snippet}
