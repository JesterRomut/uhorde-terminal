<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import type { CardInstance } from "./types";
    import { cardRegistry } from "$lib/data/cards";
    let {
        instance,
        ...props
    }: HTMLAttributes<any> & { instance: CardInstance } = $props();
</script>

<div
    {...props}
    class="w-[20vw] max-w-[10rem] aspect-[1/1.4]
      bg-[image:linear-gradient(#fff2,_transparent)]
      border-solid border-gray-950/75 border-[1px] shadow-md shadow-gray-950/25
      backdrop-blur-sm grid justify-center items-center rounded-lg m-[0_-6vw] md:m-[0_-45px] overflow-hidden
      "
>
    <div class="**:pointer-events-none **:select-none">
        {@render cardRegistry.get(instance.type).background()}
    </div>

    <div
        class="w-full text-center absolute top-0 left-1/2 transform-[translateX(-50%)] overflow-hidden overflow-ellipsis whitespace-nowrap"
    >
        {@render cardRegistry.get(instance.type).title?.()}
    </div>

    <div
        class="w-full text-center absolute bottom-0 left-1/2 transform-[translateX(-50%)] whitespace-nowrap hidden md:block"
    >
        {@render cardRegistry.get(instance.type).category?.()}
    </div>
</div>
