<script>
    import CardSlot from "./CardSlot.svelte";
</script>

<CardSlot
    oninsert={(state) => {}}
    texts={{
        empty: () => `动词`,
        filled: (item) => `${item}`,
        dragging: () => `<待输入>`,
    }}
></CardSlot>
<CardSlot
    oninsert={(state) => {}}
    texts={{
        empty: () => `名词`,
        filled: (item) => `${item}`,
        dragging: () => `<待输入>`,
    }}
></CardSlot>
