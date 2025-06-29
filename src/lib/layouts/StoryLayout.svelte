<script module lang="ts">
    import { default as a } from "./CardCollectibleLink.svelte";
    import { default as img } from "./ImageHandler.svelte";
    export { a, img };
</script>

<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

{@render children()}
