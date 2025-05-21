<script lang="ts">
    import type {
        DragDropCallback,
        DragDropState,
    } from "$lib/actions/dragdrop/types";
    import type { CardData } from "$lib/data/cards";
    import type { CardInstance } from "$lib/components/cardboard/types";
    import CardSlot from "./CardSlot.svelte";
    import type { DisplayTextsOptions, HandleDropFn } from "./types";
    import { fromStore } from "svelte/store";
    import { globalState } from "$lib/actions/dragdrop/store.svelte";

    // interface SlotOption {
    //     callbacks?: DragDropCallback<CardInstance>;
    //     texts?: DisplayTextsOptions;
    // }
    type ValidationFn = (state: DragDropState<CardInstance>) => boolean;

    interface Props {
        verb?: CardInstance | undefined;
        verbDisabled?: boolean;
        //verbOptions?: SlotOption;
        noun?: CardInstance | undefined;
        nounDisabled?: boolean;
        validVerb?: ValidationFn;
        validNoun?: ValidationFn;
        consumeVerb?: boolean;
        consumeNoun?: boolean;
    }

    let {
        verb = $bindable(),
        noun = $bindable(),
        verbDisabled = $bindable(false),
        nounDisabled = $bindable(false),
        validVerb = () => true,
        validNoun = () => true,
        consumeVerb = false,
        consumeNoun = false,
    }: Props = $props();

    // function handleVerbDrop(state: DragDropState<CardInstance>) {
    //     state = handleUniversalDrop(state) || state;
    //     state = verbOptions.ondrop(state) || state;
    //     return state;
    // }
    // function handleNounDrop(state: DragDropState<CardInstance>) {
    //     state = handleUniversalDrop(state) || state;
    //     state = nounOptions.ondrop(state) || state;
    //     return state;
    // }
    // function handleUniversalDrop(state: DragDropState<CardInstance>) {
    //     return ondrop?.(state);
    // }
    type SelectedSlot = "verb" | "noun";
    let group: SelectedSlot = $state("verb");

    let consume = $derived(
        consumeVerb || consumeNoun
            ? group === (consumeVerb ? "verb" : "noun")
            : false
    );
</script>

{#snippet exhaustIcon()}
    <div
        class="inline-flex w-[1.3em] ml-1 h-full align-middle"
        data-title={consume
            ? "消耗：此槽位进行操作后会改变对象的状态，导致指针失效。"
            : null}
    >
        <svg
            class:stroke-slate-700={!consume}
            class:stroke-rose-600={consume}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g><g id="SVGRepo_iconCarrier">
                <path
                    d="M12 3V5M12 5C15.866 5 19 8.13401 19 12M12 5C11.5608 5 11.131 5.04045 10.7142 5.11783M12 19V21M12 19C8.13401 19 5 15.866 5 12M12 19C13.933 19 15.683 18.2165 16.9497 16.9497M3 12H5M5 12C5 10.065 5.78512 8.3134 7.05417 7.04634M19 12H21M19 12C19 12.4385 18.9597 12.8675 18.8826 13.2837M12 15C10.3431 15 9 13.6569 9 12M12 15C12.7684 15 13.4692 14.7111 14 14.2361M12 15C12.8274 15 13.5766 14.665 14.1194 14.1233M9 12C9 11.2316 9.28885 10.5308 9.76389 10M9 12C9 11.1716 9.33579 10.4216 9.87868 9.87868M3 3L21 21"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </g>
        </svg>
    </div>
{/snippet}

<div class="bg-black h-[2em] rounded-md pl-2 flex flex-nowrap">
    [
    <CardSlot
        callbacks={{
            onDragOver: (state) => {
                state.invalidDrop = !validVerb(state);

                //return state;
            },
            onDrop: (state) => {
                if (state.invalidDrop) return;
                const { draggedItem, sourceContainer, targetContainer } = state;
                if (!targetContainer || sourceContainer === targetContainer)
                    return;

                verb = draggedItem;
            },
        }}
        texts={{
            empty: () => `动词`,
            filled: (item) => `${item}`,
            dragging: () => `<待输入>`,
            tooltip: () =>
                `动词：表示动作、发展、变化、存在、消失、或是事件发生之词。`,
        }}
        name="verb-noun-slots"
        value={"verb" as SelectedSlot}
        bind:disabled={verbDisabled}
        bind:item={verb}
        bind:group
    ></CardSlot>
    ：
    <CardSlot
        callbacks={{
            onDragOver: (state) => {
                state.invalidDrop = !validNoun(state);
                console.log(!validNoun(state));
                //return state;
            },
            onDrop: (state) => {
                if (state.invalidDrop) return;
                const { draggedItem, sourceContainer, targetContainer } = state;
                if (!targetContainer || sourceContainer === targetContainer)
                    return;

                noun = draggedItem;
            },
        }}
        name="verb-noun-slots"
        texts={{
            empty: () => `名词`,
            filled: (item) => `${item}`,
            dragging: () => `<待输入>`,
            tooltip: () => `名词：表示人或事物名称之词。`,
        }}
        value={"noun" as SelectedSlot}
        bind:disabled={nounDisabled}
        bind:item={noun}
        bind:group
    ></CardSlot>
    ]
    {#if consumeVerb || consumeNoun}
        {@render exhaustIcon()}
    {/if}
</div>
