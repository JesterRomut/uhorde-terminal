<svelte:options customElement={{ shadow: "none" }} />

<script lang="ts">
    import WeightedRandom from "$lib/classes/WeightedRandom";
    import { onDestroy, onMount } from "svelte";
    interface Logos {
        L: string;
        o: string;
        g: string;
        O: string;
        S: string;
    }

    export const logos = new WeightedRandom<Logos>();
    logos
        .add({
            L: "Liminal",
            o: "Object",
            g: "Gatekeeper",
            O: "Of",
            S: "Stories",
        })
        .add({
            L: "Library",
            o: "Of",
            g: "Guessing",
            O: "Omni",
            S: "Science",
        })
        .add({
            L: "Logfile",
            o: "Oriented",
            g: "Global",
            O: "Operating",
            S: "System",
        })
        .add({
            L: "Lead,",
            o: "Oversight,",
            g: "Gauge,",
            O: "Ordiance,",
            S: "Sustain",
        })
        .add({
            L: "Light",
            o: "Of",
            g: "God",
            O: "Overcoming",
            S: "Sin",
        })
        .add({
            L: "Lazy",
            o: "Ostrich",
            g: "Gobbling",
            O: "Overjoyed",
            S: "Sardines",
        });

    // /**@type {WeightedRandom<string>}*/
    // const puncList = new WeightedRandom();
    // puncList.add("#").add("$").add("@").add("%").add("&");

    // function logotapper(node: HTMLElement, params?: { speed?: number }) {
    //     let speed = params?.speed || 1;
    //     const valid =
    //         node.childNodes.length === 1 &&
    //         node.childNodes[0].nodeType === Node.TEXT_NODE;

    //     if (!valid) {
    //         throw new Error(
    //             `This transition only works on elements with a single text node child`
    //         );
    //     }

    //     const text = node.textContent || "";
    //     const duration = text.length / (speed * 0.01);

    //     return {
    //         duration,
    //         tick: (t: number) => {
    //             const i = ~~(text.length * t);
    //             node.textContent = text.slice(0, i);
    //         },
    //     };
    // }
    function logotapper(
        node: HTMLElement,
        params?: { speed?: number; noise?: number }
    ) {
        let speed = params?.speed || 1;
        const noise = params?.noise ?? 0.8;
        const valid =
            node.childNodes.length === 1 &&
            node.childNodes[0].nodeType === Node.TEXT_NODE;
        if (!valid) {
            throw new Error(
                `This transition only works on elements with a single text node child`
            );
        }
        const text = node.textContent || "";
        const duration = text.length / (speed * 0.01);
        function getRandomChar() {
            // 生成可打印ASCII字符（从空格到~）
            return String.fromCharCode(
                Math.floor(Math.random() * (126 - 33) + 33)
            );
        }
        return {
            duration,
            tick: (t: number) => {
                const i = ~~(text.length * t);
                const isFinal = t === 1;

                // 过渡结束时显示完整正确文本
                const displayedText = isFinal
                    ? text
                    : Array.from(text.slice(0, i))
                          .map((c, i) => {
                              if (i === 0) return c;
                              return Math.random() < noise
                                  ? getRandomChar()
                                  : c;
                          })
                          .join("");
                node.textContent = displayedText;
            },
        };
    }

    let logo = $state(logos.roll());

    let timer: NodeJS.Timeout | undefined;

    const time = 3000;

    onMount(() => {
        function _roll() {
            let result = logos.roll();
            if (result.L == logo.L) return _roll();
            else return result;
        }
        logo = _roll();
        timer = setInterval(() => {
            logo = _roll();
        }, time);
    });

    onDestroy(() => {
        if (!timer) return;
        clearInterval(timer);
    });
</script>

<div class="inline-block">
    {#key logo}
        <span class="inline-block text-amber-200" transition:logotapper>
            {logo?.L}
        </span>
    {/key}
    {#key logo}
        <span class="inline-block text-lime-200" transition:logotapper
            >{logo?.o}</span
        >
    {/key}
    {#key logo}
        <span class="inline-block text-teal-200" transition:logotapper
            >{logo?.g}</span
        >
    {/key}
    {#key logo}
        <span class="inline-block text-sky-200" transition:logotapper
            >{logo?.O}</span
        >
    {/key}
    {#key logo}
        <span class="inline-block text-indigo-200" transition:logotapper
            >{logo?.S}</span
        >
    {/key}
</div>

<style>
</style>
