<script module>
    export { title, background, category };

    export const display = "#ℵ0 (Amen-Gleph)";
</script>

<script>
    import Aleph0 from "$lib/assets/cards/characters/amen_gleph.png?enhanced";
    import Aleph0SVG from "$lib/assets/cards/characters/amen_gleph.svg?dataurl";
</script>

{#snippet title()}
    <span class="block bg-black">阿门-葛列夫</span>
{/snippet}
{#snippet category()}
    <span class="inline-block relative px-3 bottom-3 bg-black">实体</span>
{/snippet}

{#snippet background()}
    <img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={Aleph0SVG}
        alt={display}
    />
{/snippet}
