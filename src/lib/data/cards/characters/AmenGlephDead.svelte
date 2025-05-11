<script module>
    export { title, background, category };

    export const display = "#ℵ0 (Amen-Gleph)";
</script>

<script>
    import Aleph0 from "$lib/assets/cards/characters/amen_gleph.png?enhanced";
    import Aleph0SVG from "$lib/assets/cards/characters/amen_gleph.svg?dataurl";
</script>

{#snippet title()}
    <span class="block bg-black"><s>阿门-葛列夫</s></span>
{/snippet}
{#snippet category()}
    <!-- <span class="inline-block relative px-3 bottom-3 bg-black">实体</span> -->
{/snippet}

{#snippet background()}
    <img
        class="invert mix-blend-lighten opacity-70 bg-black"
        src={Aleph0SVG}
        alt={display}
    />

    <div class="absolute w-full h-full top-0 left-0 bg-gray-950/50">1</div>
    <span
        class="hidden md:block text-shadow-lg text-shadow-black/50 absolute top-1/2 left-1/2 transform-[translateX(-50%)_translateY(-50%)]"
        >于是，人们将其尸骨食去了。</span
    >
{/snippet}
