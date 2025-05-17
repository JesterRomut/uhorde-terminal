<script>
    /** @type {{children: import('svelte').Snippet }} */
    let { children } = $props();
</script>

<article
    class="prose prose-sm prose-console max-w-none prose-hr:border-t-[var(--tw-prose-body)] prose-hr:border-t-[2px] prose-hr:mt-[0.6em] prose-hr:mb-[2em] prose-headings:mt-[0.2em]"
>
    {@render children()}
</article>
