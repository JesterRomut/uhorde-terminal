<script module lang="ts">
    import { default as a } from "./CardCollectibleLink.svelte";
    export { a };
</script>

<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

{@render children()}
