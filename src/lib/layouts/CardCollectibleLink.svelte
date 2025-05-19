<script module lang="ts">
</script>

<script lang="ts">
    import CardCollectible from "$lib/components/cardboard/CardCollectible.svelte";

    import type { Snippet } from "svelte";

    let { children, href }: { children: Snippet; href: string } = $props();
</script>

<CardCollectible event={href}>{@render children()}</CardCollectible>
