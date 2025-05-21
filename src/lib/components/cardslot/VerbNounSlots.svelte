<script lang="ts">
    import type { DragDropState } from "$lib/actions/dragdrop/types";
    import type { CardInstance } from "$lib/components/cardboard/types";
    import CardSlot from "./CardSlot.svelte";

    import {
        retryIcon,
        submitIcon,
        exhaustIcon,
    } from "$lib/components/Icons.svelte";
    import type { Writable } from "svelte/store";
    import { onMount } from "svelte";
    import Card from "../cardboard/Card.svelte";
    // interface SlotOption {
    //     callbacks?: DragDropCallback<CardInstance>;
    //     texts?: DisplayTextsOptions;
    // }
    type ValidationFn = (state: DragDropState<CardInstance>) => boolean;
    type NullableCardInstance = CardInstance | undefined;
    interface Props {
        verb?: NullableCardInstance;
        verbDisabled?: boolean;
        //verbOptions?: SlotOption;
        noun?: NullableCardInstance;
        nounDisabled?: boolean;
        disabled?: boolean;
        validVerb?: ValidationFn;
        validNoun?: ValidationFn;
        validSubmit?: (
            verb: NullableCardInstance,
            noun: NullableCardInstance
        ) => boolean;
        consumeVerb?: boolean;
        consumeNoun?: boolean;
        cardboard: Writable<CardInstance[]>;
        afterdrop?: (
            state: DragDropState<CardInstance>,
            group: SelectedSlot
        ) => void;
        onsubmit?: (
            verb: NullableCardInstance,
            noun: NullableCardInstance
        ) => void;
    }

    let {
        verb = $bindable(),
        noun = $bindable(),
        verbDisabled = false,
        nounDisabled = false,
        disabled = false,
        validVerb = () => true,
        validNoun = () => true,
        validSubmit = () => true,
        consumeVerb = false,
        consumeNoun = false,
        cardboard,
        afterdrop,
        onsubmit,
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

    function insertCardOrReplace(state: DragDropState<CardInstance>) {
        let cardIndex = $cardboard.findIndex(
            (card) => card.type == state.draggedItem.type
        );
        if (cardIndex === -1) throw new TypeError("card not found in list");

        let cardToBeReplaced: CardInstance | undefined;
        //console.log(group);
        switch (group) {
            case "verb":
                cardToBeReplaced = verb;
                verb = state.draggedItem;
                break;
            case "noun":
                cardToBeReplaced = noun;
                noun = state.draggedItem;
                break;
        }
        cardboard.update((cards) => {
            if (!cardToBeReplaced) return cards.toSpliced(cardIndex, 1);
            return cards.toSpliced(cardIndex, 1, cardToBeReplaced);
        });
    }
</script>

{#snippet toolbar()}
    <div class="flex h-full self-end pr-2 gap-1">
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a
            href="javascript:;"
            class="inline-flex w-[1.3em] ml-1 h-full align-middle *:stroke-slate-300 *:hover:stroke-amber-200"
            data-title={"提交：提交选定的指针。"}
            aria-label={"提交：提交选定的指针。"}
            onclick={() => {
                if (!validSubmit(verb, noun)) return;
                if (onsubmit) onsubmit(verb, noun);

                if (verb && !consumeVerb) {
                    cardboard.update((cards) =>
                        cards.concat(verb as CardInstance)
                    );
                    //verb = undefined;
                }
                if (noun && !consumeNoun) {
                    cardboard.update((cards) =>
                        cards.concat(noun as CardInstance)
                    );
                    //noun = undefined;
                }

                disabled = true;
            }}
        >
            {@render submitIcon()}
        </a>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a
            href="javascript:;"
            class="inline-flex w-[1.3em] ml-1 h-full align-middle *:stroke-slate-300 *:hover:stroke-amber-200"
            data-title={"重试：返还指针至手中。"}
            aria-label={"重试：返还指针至手中。"}
            onclick={() => {
                if (verb) {
                    cardboard.update((cards) =>
                        cards.concat(verb as CardInstance)
                    );
                    verb = undefined;
                }
                if (noun) {
                    cardboard.update((cards) =>
                        cards.concat(noun as CardInstance)
                    );
                    noun = undefined;
                }
            }}
        >
            {@render retryIcon()}
        </a>
    </div>
{/snippet}

<div class="bg-black h-[2em] rounded-md pl-1 flex flex-nowrap">
    {#if !disabled}
        {@render toolbar()}
    {/if}

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
                insertCardOrReplace(state);
                if (afterdrop) afterdrop(state, group);
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
        disabled={verbDisabled || disabled}
        bind:item={verb}
        bind:group
    ></CardSlot>
    ：
    <CardSlot
        callbacks={{
            onDragOver: (state) => {
                state.invalidDrop = !validNoun(state);
                //console.log(!validNoun(state));
                //return state;
            },
            onDrop: (state) => {
                if (state.invalidDrop) return;
                const { draggedItem, sourceContainer, targetContainer } = state;
                if (!targetContainer || sourceContainer === targetContainer)
                    return;
                insertCardOrReplace(state);
                if (afterdrop) afterdrop(state, group);
                //noun = draggedItem;
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
        disabled={nounDisabled || disabled}
        bind:item={noun}
        bind:group
    ></CardSlot>
    ]
    {#if !disabled && (consumeVerb || consumeNoun)}
        <div
            class:*:stroke-slate-700={!consume}
            class:*:stroke-rose-600={consume}
            class="inline-flex w-[1.3em] ml-1 h-full align-middle"
            data-title={consume
                ? "消耗：此槽位进行操作后会改变对象的状态，导致指针失效。"
                : null}
        >
            {@render exhaustIcon()}
        </div>
    {/if}
</div>
