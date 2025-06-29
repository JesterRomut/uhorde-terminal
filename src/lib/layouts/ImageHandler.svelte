<script module lang="ts">
</script>

<script lang="ts">
    let { src: imgIdRaw }: { src: string } = $props();

    let imgPromise = import(`$lib/assets/stories/${imgIdRaw}.png`);
</script>

{#await imgPromise then img}
    <img src={img.default} alt={imgIdRaw} />
{/await}
